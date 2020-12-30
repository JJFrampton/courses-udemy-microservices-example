const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const SERVICE = "eventBus";
const ENV = process.env.ENV || 'custom';
const config = require('../config')[ENV];
const PORT = process.env.POST_SERVICE_PORT || config[SERVICE]['port'];
const IP = config['acceptAll'] || "127.0.0.1";

app.post('/events', (req, res) => {
	const event = req.body;

	axios.post(config['external']['postService'] + '/events', event);
	axios.post(config['external']['commentService'] + '/events', event);
	axios.post(config['external']['queryService'] + '/events', event);
	axios.post(config['external']['moderatorService'] + '/events', event);

	res.send({status: 'OK'});
})

app.listen(PORT, IP, () => {
	console.log(`Using IP ${IP}`);
	console.log(`Listening on port ${PORT}`);
});