const express = require('express'),
	  app = express(),
	  neuralNet = require('./neuralNet.js'),
	  bodyParser = require('body-parser'),
	  path = require('path');

app.use(express.static(path.join(__dirname + `/../Resources`)));

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + `/../index.html`));
});

app.post('/ocr', (req, res) => {
	if (req.body.train) {
		neuralNet.train(req.body.trainArray);
		neuralNet.save();
	}
	res.json(req.body);
});

app.listen(3000, err => err || console.log('Listening on port 3000.'));