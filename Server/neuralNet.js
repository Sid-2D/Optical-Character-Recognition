var synaptic = require('synaptic'),
	fs = require('fs');
var data = fs.readFileSync('Server/data.json');
var network = new synaptic.Architect.Perceptron(400, 100, 10);
var trainer = new synaptic.Trainer(network);

module.exports = {
	train: function (imagePixels) {
		trainer.train(imagePixels, {
			iterations: 1000,
			error: .0001,
			rate: 0.3
		});
	},
	activate: function (imagePixels) {
		return network.activate(imagePixels)[0].toFixed(0);
	},
	save: function () {
		data = network.toJSON();
		console.log(data);
		fs.writeFile('Server/data.json', JSON.stringify(data, null, 2), err => {
			if (err) {
				console.log(err);
			}
		});
	}
};