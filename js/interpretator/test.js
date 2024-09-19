let turingQuinte = new TuringQuinte(["0", "1"]);

let programm = prepros(`q0, L, L, r, q1
q1, 0, 1, r, q1
q1, 1, 0, r, q1
q1, L, L, s, q1`);

let a = 1;
for (let i of "0111001") turingQuinte.memWrite(a++, i);

while (true) {
	let end = turingQuinte.step(programm);
	console.log(turingQuinte.getMemSegment(-2, 10).join("|"));
	if (end) break;
}