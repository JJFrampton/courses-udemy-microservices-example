const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const SERVICE = "postService";
const ENV = process.env.ENV || 'custom';
const config = require('../config')[ENV];
const PORT = process.env.POST_SERVICE_PORT || config[SERVICE]['port'];
const IP = config['acceptAll'] || "127.0.0.1";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // in memory "database"

app.get('/posts', (req, res) => {
	res.send(posts);
});
app.post('/posts', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;
	console.log(req.body);

	posts[id] = {
		id, title
	};

	await axios.post(config['external']['eventBus'] + '/events', {
		"type": "PostCreated",
		"data": posts[id]
	});

	res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
	console.log('RecievedEvent', req.body.type);
	res.send({});
})

app.listen(PORT, IP, () => {
	console.log(`Using IP ${IP}`);
	console.log(`listening on route ${PORT}`);
});