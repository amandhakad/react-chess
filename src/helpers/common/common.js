export const squareIndexToNotation = (index) => {
	let row = Math.floor(index/8);
	let column = index%8;

	let letter = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"}

	return (letter[column])+((8-row).toString());
}

export const squareNotationToIndex = (notation) => {
	let columnLetter = notation.charAt(0);
	let columnMap = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5,"g": 6, "h": 7};

	let row = 8-parseInt(notation.charAt(1));
	let column = columnMap[columnLetter];

	return (8*row)+column;
}

export const makePiecesArray = (board) => {
	let pieces = Array(64).fill(null);

	//row loop
	for(let i=0; i < board.length; i++) {
		//square loop
		for(let j=0; j<board[i].length; j++) {
			let pieceValue = board[i][j] ? (board[i][j].color + board[i][j].type.toUpperCase()): null;

			//superIndex is index of allpieces from 0 to 63
			let superIndex = (i*8)+j;
			pieces[superIndex] = pieceValue;
		}
	}

	return pieces;
}