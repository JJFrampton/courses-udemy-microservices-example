const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const SERVICE = "moderatorService";
const ENV = process.env.ENV || 'custom';
const config = require('../config')[ENV];
const PORT = process.env.POST_SERVICE_PORT || config[SERVICE]['port'];
const IP = config['acceptAll'] || "127.0.0.1";

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentCreated') {
		const status = data.content.includes('orange') ? 'rejected' : 'approved';

		await axios.post(config['external']['eventBus'] + '/events', {
			type: 'CommentModerated',
			data: { ...data,
				status
			}
		});
	}
	res.send({});
});

app.listen(PORT, IP, () => {
	console.log(`Using IP ${IP}`);
	console.log(`Starting on ${PORT}`);
});