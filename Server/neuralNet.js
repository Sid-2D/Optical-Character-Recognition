var synaptic = require('synaptic'),
	fs = require('fs');
var data = fs.readFileSync('Server/data.json');
// var network = new synaptic.Architect.Perceptron(400, 10, 10);
var network = new synaptic.Network.fromJSON(JSON.parse(data));
var trainer = new synaptic.Trainer(network);

module.exports = {
	train: function (imagePixels) {
		trainer.train(imagePixels, {
			iterations: 100,
			error: .001,
			rate: 0.3
		});
	},
	activate: function (imagePixels) {
		return network.activate(imagePixels)[0].toFixed(0);
	},
	save: function () {
		data = network.toJSON();
		fs.writeFile('Server/data.json', JSON.stringify(data, null, 2), err => {
			if (err) {
				console.log(err);
			}
		});
	}
};