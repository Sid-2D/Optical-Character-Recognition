var synaptic = require('synaptic');
var network = new synaptic.Architect.Perceptron(400, 100, 10);
var trainer = new synaptic.Trainer(network);

// var trainingSet = [
// 	{
// 		input: [0, 0],
// 		output: [0]
// 	},
// 	{
// 		input: [0, 1],
// 		output: [1]
// 	},
// 	{
// 		input: [1, 0],
// 		output: [1]
// 	},
// 	{
// 		input: [1, 1],
// 		output: [0]
// 	}
// ];

function train(imagePixels) {
	trainer.train(imagePixels, {
		iterations: 1000,
		error: .0001,
		rate: 0.3
	});
}

function ocr(imagePixels) {
	return network.activate(imagePixels)[0].toFixed(0),
}