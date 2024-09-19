class TuringQuinte extends TuringImplementation {
	constructor (alphabet) {
		super(alphabet);
	};

	step (programm) {
		let programmCheckResult = this.validateProgramm(programm, instruction => {
			if (instruction.length !== 5) return `Incorrect instruction length ${instruction.length}.`;

			if (!this.core.inAlphabet(instruction[1])) return `Letter ${instruction[1]} is not in alphabet.`;
			if (!this.core.inAlphabet(instruction[2])) return `Letter ${instruction[2]} is not in alphabet.`;

			if (!Object.values(config.quinte.commands).includes(instruction[3])) return `Unexpected dir: ${instruction[3]}.`;

			return "ok";
		});

		if (programmCheckResult !== "ok") throw new Error(programmCheckResult);

		let instruction = this.getCurrentInstruction(programm);
		if (instruction === null) {
			throw new Error(`Unable to determine instruction for state ${this.core.state} and value ${this.core.cellValue}`);
		}

		let newValue = instruction[2];
		let moveDir = instruction[3];
		let newState = instruction[4];

		this.core.cellValue = newValue;
		this.core.state = newState;

		if (moveDir === config.quinte.commands.left) this.core.moveLeft();
		if (moveDir === config.quinte.commands.right) this.core.moveRight();

		if (moveDir === config.quinte.commands.stop) return true;
		return false;
	};
};