class TuringImplementation {
	constructor (alphabet) {
		this._core = new TuringCore(alphabet);
	};

	get core () {
		return this._core;
	};

	memRead (addr) {
		return this.core.memRead(addr);
	};

	memWrite (addr, value) {
		return this.core.memWrite(addr, value);
	};

	memClear () {
		this.core.memClear();
	};

	reset () {
		this.core.reset();
	};

	getMemSegment (from, to) {
		let res = [];
		for (let i = from; i < to; i++) res.push(this.memRead(i));
		return res;
	};

	writeWord (addr, word) {
		for (let i of word) this.memWrite(addr++, i);
	};

	getCurrentInstruction (programm, extractStateAndValue = instruction => [instruction[0], instruction[1]]) {
		let instruction = programm.find(instruction => {
			let [instructionState, instructionValue] = extractStateAndValue(instruction.slice(1));

			return instructionState === this.core.state && instructionValue === this.core.cellValue;
		});

		if (!instruction) return null;
		return instruction.slice(1);
	};

	validateProgramm (programm, instructionCorrectCheck) {
		for (let i of programm) {
			let result = instructionCorrectCheck(i.slice(1));
			if (result !== "ok") return result + ` Line ${i[0]}.`;
		}

		return "ok";
	};
};