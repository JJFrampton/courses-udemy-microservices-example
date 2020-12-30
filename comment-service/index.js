const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const SERVICE = "commentService";
const ENV = process.env.ENV || 'custom';
const config = require('../config')[ENV];
const PORT = process.env.POST_SERVICE_PORT || config[SERVICE]['port'];
const IP = config['acceptAll'] || "127.0.0.1";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/', (req, res) => {
	res.send(commentsByPostId);

});
app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);

});
app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];

	let newComment = { id: commentId, content, status: 'pending'};
	comments.push(newComment);

	commentsByPostId[req.params.id] = comments;

	await axios.post(config['external']['eventBus'] + '/events', {
		type: 'CommentCreated',
		data: { ...newComment,
			postId: req.params.id
		}
	})

	res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
	console.log('RecievedEvent', req.body.type);

	const { type, data } = req.body;

	if ( type === 'CommentModerated' ) {
		const { postId, id, status, content } = data;
		const comments = commentsByPostId[postId];

		const comment = comments.find(comment => {
			return comment.id === id;
		});
		comment.status = status;

		await axios.post(config['external']['eventBus'] + '/events', {
			type: 'CommentUpdated',
			data: {
				id,
				status,
				postId,
				content
			}
		}).catch((e) => {
			console.log(e);
		});
	}

	res.send({});
})

app.listen(PORT, IP, () => {
	console.log(`Using IP ${IP}`);
	console.log(`listening on port ${PORT}`);
})