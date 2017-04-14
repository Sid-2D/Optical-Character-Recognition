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
		console.log('Request received for TRAIN.');
		console.log('Starting training.');
		neuralNet.train(req.body.trainArray);
		console.log('Training complete.');
		// neuralNet.save();
	} 
	if (req.body.predict) {
		console.log('Request received for PREDICTION.');
		console.log("Starting prediction.")
		console.log(neuralNet.activate(req.body.image));
		console.log("Prediction complete.")
	}
});

app.listen(3000, err => err || console.log('Listening on port 3000.'));