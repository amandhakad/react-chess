/*
* Function that will return available legal moves from board state and selected piece
* ***Under Development***
* Author: Aman Dhakad https://github.com/amandhakad
*/

/*
* Arguments:
* pieces = Array(64) that contains piece values: ["bR, bK, bB, bQ",.....]
* history = history of moves (not using yet)
* next = next white or black
* selected = id of the square that is selected from 0 to 63
*
* Return:
* returns an array of id of available squares for now
*/

function availableMoves(pieces, next, selected) {
	
	//available moves
	let a_moves =[];

	//s as selected for short
	let s = selected;

	//selected piece as piece
	let piece = pieces[selected];

	//for white Pawns
	if (piece==="wP") {
		a_moves.push(s-8);
		if (s>47 && s<56) {
			a_moves.push(s-16);
		}
	}
	return a_moves;
}
export default availableMoves;