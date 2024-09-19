(() => {

const replacer = (className, replace = "$&") => `<span class="${className}">${replace}</span>`;

class Highlighter {
	constructor (alphabet) {
		this.masks = this.createMasks(alphabet);
		this.replacers = this.createReplacers();
	};

	createMasks (alphabet) {
		return {
			comment: /#[^\n]*\n/g,
			command: new RegExp(`\\W[${Object.values(config.quinte.commands).join("")}]\\W`, "g"),
			lambda: new RegExp(`\\W[${config.lambdaSymbol}]\\W`, "g"),
			alphabet: new RegExp(`\\W(${alphabet.join("|")})\\W`, "g"),
		};
	};

	createReplacers () {
		return {
			comment: replacer("h_comment"),
		};
	};

	highlight (text) {
		let sep = config.prepros.instructionPartsSep;

		let states = text.split("\n").map(e => {
			let [instruction, _] = e.split(config.prepros.comment);
			let state = null;
			if (instruction !== "") state = instruction.split(sep)[0];
			return state;
		}).filter(e => e !== null);

		let statesMask = new RegExp(`(${states.sort().reverse().join("|")})[\\${sep}\\s]`, "g");

		text = text.replaceAll(this.masks.comment, this.replacers.comment);
		text = text.replaceAll(this.masks.command, match => match[0] + replacer("h_command", match.slice(1, -1)) + match.slice(-1));
		text = text.replaceAll(this.masks.lambda, match => match[0] + replacer("h_lambda", match.slice(1, -1)) + match.slice(-1));
		text = text.replaceAll(this.masks.alphabet, match => match[0] + replacer("h_alphabet_char", match.slice(1, -1)) + match.slice(-1));
		text = text.replaceAll(statesMask, match => replacer("h_state", match.slice(0, -1)) + match.slice(-1));

		return text;
	};
};

window.Highlighter = Highlighter;

})();