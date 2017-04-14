var CANVAS_WIDTH = 200,
 	TRANSLATED_WIDTH = 20,
 	PIXEL_WIDTH = 10,
 	DATA = [],
 	TRAINING_REQUEST_COUNT = 0,
 	TRAIN_ARRAY = [],
 	BATCH_SIZE = 1;

function init() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
	drawGrid(ctx);
	for (var i = 0; i < 400; i++) {
		DATA[i] = 0;
	}
	canvas.onmousemove = event => onMouseMove(event, ctx, canvas);
	canvas.onmousedown = event => onMouseDown(event, ctx, canvas);
	canvas.onmouseup = event => onMouseUp(event, ctx);
}

function drawGrid(ctx) {
	for (var x = PIXEL_WIDTH, y = PIXEL_WIDTH; x < CANVAS_WIDTH; x += PIXEL_WIDTH, y += PIXEL_WIDTH) {
		ctx.strokeStyle = '#00f';
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, CANVAS_WIDTH);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(CANVAS_WIDTH, y);
		ctx.stroke();
	}
}

function onMouseMove(e, ctx, canvas) {
	if (canvas.isDrawing) {
		fillSquare(ctx, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
	}
}

function onMouseDown(e, ctx, canvas) {
	canvas.isDrawing = true;
	fillSquare(ctx, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function onMouseUp(e) {
	canvas.isDrawing = false;
}

function fillSquare(ctx, x, y) {
	var xPixel = parseInt(x / PIXEL_WIDTH);
	var yPixel = parseInt(y / PIXEL_WIDTH);
	DATA[((xPixel - 1) * TRANSLATED_WIDTH + yPixel) - 1] = 1;
	ctx.fillStyle = "#fff";
	ctx.fillRect(xPixel * PIXEL_WIDTH, yPixel * PIXEL_WIDTH, PIXEL_WIDTH, PIXEL_WIDTH);
}

function test() {
	console.log('Testing...');
	if (DATA.indexOf(1) < 0) {
		console.log("Returning in middle.");
		return;
	}
	var json = {
		image: DATA,
		predict: true
	};
	sendData(json);
}

function train() {
	console.log('Training...');
	var digitVal = document.getElementById("digit").value;
	if (!digitVal || DATA.indexOf(1) < 0) {
		return;
	}
	TRAIN_ARRAY.push({ input: DATA, output: [parseInt(digitVal)] });
	TRAINING_REQUEST_COUNT++;
	if (TRAINING_REQUEST_COUNT === BATCH_SIZE) {
		var json = {
			trainArray: TRAIN_ARRAY,
			train: true
		};
		console.log('Body: ', json);
		sendData(json);
		TRAINING_REQUEST_COUNT = 0;
		TRAIN_ARRAY = [];
	}
}

function sendData(json) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/ocr', true);
	xhr.onload = () => {
		var response = JSON.parse(xhr.response);
		console.log(response);
		if (response.type === 'test') {
			alert("Prediction: ");
		}
	}
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(JSON.stringify(json));
}