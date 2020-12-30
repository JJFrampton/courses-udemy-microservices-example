const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const SERVICE = "queryService";
const ENV = process.env.ENV || 'custom';
const config = require('../config')[ENV];
const PORT = process.env.POST_SERVICE_PORT || config[SERVICE]['port'];
const IP = config['acceptAll'] || "127.0.0.1";

const posts = {};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	if (type === 'PostCreated') {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	}

	if (type === 'CommentCreated') {
		const { id, content, postId, status } = data;

		const post = posts[postId];
		post.comments.push({ id, content, status });
	}

	console.log(posts);
	res.send({});
});

app.listen(PORT, IP, () => {
	console.log(`Using IP ${IP}`);
	console.log(`Listening on port ${PORT}`);
});