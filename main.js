var CANVAS, CONTEXT, CANVAS_WIDTH = 200, TRANSLATED_WIDTH = 20, PIXEL_WIDTH = 10;

function drawGrid() {
	CANVAS = document.getElementById('canvas');
	CONTEXT = CANVAS.getContext('2d');
	for (var x = PIXEL_WIDTH, y = PIXEL_WIDTH; x < CANVAS_WIDTH; x += PIXEL_WIDTH, y += PIXEL_WIDTH) {
		CONTEXT.strokeStyle = '#00f';
		CONTEXT.beginPath();
		CONTEXT.moveTo(x, 0);
		CONTEXT.lineTo(x, CANVAS_WIDTH);
		CONTEXT.stroke();
		CONTEXT.beginPath();
		CONTEXT.moveTo(0, y);
		CONTEXT.lineTo(CANVAS_WIDTH, y);
		CONTEXT.stroke();
	}
}

window.addEventListener();