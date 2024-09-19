const prepros = function (code) {
	let lines = code.split("\n");

	let linesCommentless = lines.map(e => e.split(config.prepros.comment)[0]);
	let notEmptyLines = linesCommentless.map((e, i) => {
		let instruction = e.trim();
		if (instruction === "") return null;
		return `${(i + 1)}${config.prepros.instructionPartsSep}${instruction}`;
	}).filter(e => e !== null);

	let programm = notEmptyLines.map(e => {
		let parts = e.split(config.prepros.instructionPartsSep);
		let cleanParts = parts.map(e => e.trim());
		return cleanParts;
	});

	return programm;
};