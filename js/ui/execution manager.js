class ExecutionManager {
	constructor (turing) {
		this.stepNum = 0;
		this.turing = turing;
		this.execution = false;
		this.intervalId = -1;
		this.interruptExecution = () => {};
	};

	step (programmText) {
		if (this.execution) return false;
		let programm = prepros(programmText);
		let end = this.turing.step(programm);
		return end;
	};

	start (programmText, onchange = () => {}) {
		if (this.execution) return;

		this.execution = true;
		this.stepNum = 0;

		return new Promise((resolve, reject) => {
			try {
				this.interruptExecution = resolve;

				let programm = prepros(programmText);

				this.intervalId = setInterval(() => {
					let end;

					try {
						end = this.turing.step(programm);
					} catch (error) {
						this.interruptExecution = () => {};
						this.stop();
						reject(error);
					}
					
					onchange();

					if (end) this.stop();

					this.stepNum++;
					if (this.stepNum > config.stepsLimit) throw new Error("Steps limit is over.");
				}, config.stepTime);
			} catch (error) {
				clearInterval(this.intervalId);
				this.execution = false;
				this.interruptExecution = () => {};
				reject(error);
			}
		});
	};

	stop () {
		clearInterval(this.intervalId);
		this.execution = false;
		this.interruptExecution();
	};
};