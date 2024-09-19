class TuringCore {
	constructor (alphabet) {
		this._alphabet = alphabet.slice(0);
		if (!this._alphabet.includes(config.lambdaSymbol)) {
			this._alphabet.push(config.lambdaSymbol);
		}

		this._state = config.state0;
		this._headPos = 0;
		this._memory = [];
	};

	inAlphabet (letter) {
		return this._alphabet.includes(letter);
	};

	get state () {
		return this._state;
	};

	set state (newState) {
		this._state = newState;
		return newState;;
	};

	get headPos () {
		return this._headPos;
	};

	set headPos (value) {
		if (typeof value !== "number") throw new TypeError("Incorect type for headPos. Must be an integer.");
		this._headPos = value | 0;
		return value;
	};

	get cellValue () {
		return this._memory[this._headPos] ?? config.lambdaSymbol;
	};

	set cellValue (value) {
		if (!this._alphabet.includes(value)) throw new Error(`In turing core. Value ${value} is not in alphabet`);
		this._memory[this._headPos] = value;
		return value;
	};

	memRead (addr) {
		return this._memory[addr] ?? config.lambdaSymbol;
	};

	memWrite (addr, value) {
		if (!this._alphabet.includes(value)) throw new Error(`In turing core. Value ${value} is not in alphabet`);
		this._memory[addr] = value;
		return value;
	};

	memClear () {
		this._memory = [];
	};

	moveLeft () {
		this._headPos--;
	};

	moveRight () {
		this._headPos++;
	};

	reset () {
		this.memClear();
		this.state = config.state0;
		this._headPos = 0;
	};
};