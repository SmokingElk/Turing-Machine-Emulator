(() => {

const errorOutput = document.getElementById("error_output");
const canvasParent = document.getElementById("canvas_parent");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
	const parentRect = canvasParent.getBoundingClientRect();
	canvas.width = parentRect.width;
	canvas.height = parentRect.height;
};

resize();
window.addEventListener("resize", resize);

const getAlphabet = () => {
	const prohibitedSymbols = [config.lambdaSymbol]
		.concat(Object.values(config.quinte.commands))
		.concat(Object.values(config.prepros));

	const input = prompt("Введите алфавит: ");
	const inputClean = input.replaceAll(new RegExp(`(${prohibitedSymbols.join("|")})`, "g"), "");

	return Array.from(new Set(inputClean));
}

const alphabet = getAlphabet();
console.log(alphabet);

const turingQuinte = new TuringQuinte(alphabet);
const executionManager = new ExecutionManager(turingQuinte);

const codeWindow = new CodeWindow(alphabet);

window.executionManager = executionManager;

window.addEventListener("keydown", async function (e) {
	if (e.code === "KeyE" && e.ctrlKey && !e.shiftKey && !executionManager.execution) {
		e.preventDefault();

		try {
			errorOutput.value = "";
			await executionManager.start(codeWindow.text);
		} catch (error) {
			errorOutput.value = error.message;
		}
	}

	if (e.code === "KeyR" && e.ctrlKey && e.shiftKey) {
		e.preventDefault();
		turingQuinte.reset();
		errorOutput.value = "";
	}

	if (e.code === "KeyS" && e.ctrlKey && e.shiftKey && !executionManager.execution) {
		e.preventDefault();

		try {
			errorOutput.value = "";
			executionManager.step(codeWindow.text);
		} catch (error) {
			errorOutput.value = error.message;
		}
	}

	if (e.code === "KeyI" && e.ctrlKey && !e.shiftKey && !executionManager.execution) {
		e.preventDefault();
		let word = prompt("Введите слово, которое будет записано в памяти справа от пишушей головки:");

		try {
			turingQuinte.writeWord(turingQuinte.core.headPos + 1, word);
		} catch (error) {
			errorOutput.value = error.message;
		}
	}

	if (e.code === "ArrowLeft" && e.ctrlKey && !executionManager.execution) {
		e.preventDefault();
		turingQuinte.core.moveLeft();
	}

	if (e.code === "ArrowRight" && e.ctrlKey && !executionManager.execution) {
		e.preventDefault();
		turingQuinte.core.moveRight();
		
	}
});

const animationLoop = function () {
	requestAnimationFrame(animationLoop);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawMemory(ctx, canvas.width, canvas.height, turingQuinte, config.lambdaSymbol);
};

window.addEventListener("load", e => {
	animationLoop();
});

})();