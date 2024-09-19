(() => {

const config = {
	cellWidth: 60,
	cellSpacing: 10,
	cellColor: "#BDBDC2",
	textColor: "#078B07",	

	lambdaColor: "#C05CFF",
	alphabetColor: "#078B07",
	cellsNumbersColor: "#929296",
};

const roundedRect = function (ctx, x, y, width, height, borderRadius) {
	ctx.beginPath();
	ctx.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI, Math.PI * 3 / 2);
	ctx.arc(x + width - borderRadius, y + borderRadius, borderRadius, Math.PI * 3 / 2, Math.PI * 2);
	ctx.arc(x + width - borderRadius, y + height - borderRadius, borderRadius, Math.PI * 2, Math.PI / 2);
	ctx.arc(x + borderRadius, y + height - borderRadius, borderRadius, Math.PI / 2, Math.PI);
	ctx.closePath();
	ctx.fill();
};

let visualPos = 0;
const drawMemory = function (ctx, width, height, turing, lambda) {
	let state = turing.core.state;
	let headPos = turing.core.headPos;

	visualPos += (headPos - visualPos) * 0.1;

	let cellsCount = (width + config.cellSpacing) / (config.cellWidth + config.cellSpacing) | 0;

	cellsCount -= 1 - cellsCount % 2;
	cellsCount += 4;

	let spacesCount = cellsCount - 1;

	let memoryFrom = (-cellsCount / 2 | 0) + headPos;
	let memoryTo = (cellsCount / 2 | 0) + 1 + headPos;

	let segmentToShow = turing.getMemSegment(memoryFrom, memoryTo);

	let summaryWidth = config.cellWidth * cellsCount + config.cellSpacing * spacesCount;

	let offset = (headPos - visualPos) * (config.cellWidth + config.cellSpacing);

	ctx.clearRect(0, 0, width, height);

	ctx.save();

	ctx.translate(width / 2 - summaryWidth / 2 + offset, config.cellSpacing * 4);

	let currentCellAddr = memoryFrom;

	for (let i = 0; i < segmentToShow.length; i++) {
		let cellValue = segmentToShow[i];

		ctx.fillStyle = config.cellColor;
		roundedRect(ctx, 0, 0, config.cellWidth, config.cellWidth, 5);

		ctx.fillStyle = cellValue === lambda ? config.lambdaColor : config.alphabetColor;
		ctx.font = "20px Consolas";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(cellValue, config.cellWidth / 2, config.cellWidth / 2);

		ctx.fillStyle = config.cellsNumbersColor;
		ctx.font = "12px Consolas";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(memoryFrom + i, 5, 5);

		ctx.translate(config.cellWidth + config.cellSpacing, 0);
	}

	ctx.restore();

	ctx.save();

	ctx.translate(width / 2, config.cellSpacing * 5 + config.cellWidth);

	ctx.fillStyle = config.textColor;
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(4, 7);
	ctx.lineTo(-4, 7);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = config.textColor;
	ctx.font = "16px Consolas";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(state, 0, 15);

	ctx.restore();

};

window.drawMemory = drawMemory;

})();