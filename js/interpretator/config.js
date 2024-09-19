const config = {
	lambdaSymbol: "L",
	state0: "q0",

	quinte: {
		commands: {
			left: "l",
			right: "r",
			stay: "u",
			stop: "s",
		},
	},

	prepros: {
		comment: "#",
		instructionPartsSep: ",",
	},

	stepsLimit: 2000,
	stepTime: 200,
};