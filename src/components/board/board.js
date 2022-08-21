import React from 'react';
import Square from './../square/square';

import { Chess } from 'chess.js';

class Board extends React.Component {

	constructor(props) {
		super(props);

		//we will get the fen on every move from library
		const chess = new Chess();
		const fen = chess.fen();
		const board = chess.board();

		let startingPieces = this.makePiecesArray(board);
		this.state = {pieces: startingPieces, fen: fen, clicked: null, availableMoves: [], isFlipped: false};
	}

	makePiecesArray(board) {
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

	squareIndexToNotation(index) {
		let row = Math.floor(index/8);
		let column = index%8;

		let letter = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"}

		return (letter[column])+((8-row).toString());
	}

	squareNotationToIndex(notation) {
		let columnLetter = notation.charAt(0);
		let columnMap = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5,"g": 6, "h": 7};

		let row = 8-parseInt(notation.charAt(1));
		let column = columnMap[columnLetter];

		return (8*row)+column;
	}

	flipTheBoard() {
		this.setState({isFlipped: !(this.state.isFlipped)});
	}

	makeMove(from, to) {
			const chess = new Chess();
			chess.load(this.state.fen);
			chess.move({ from: this.squareIndexToNotation(from), to: this.squareIndexToNotation(to) });
			const fen = chess.fen();
			const board = chess.board();
			let piecesArray = this.makePiecesArray(board);
			this.setState({pieces: piecesArray, fen: fen, clicked: null, availableMoves: []});
			return true;
	}

	//updating state on clicking square component
	handleClick(i) {
		const chess = new Chess();
		chess.load(this.state.fen);

		let clickedSquareNotation = this.squareIndexToNotation(i);

		//if no square is already clicked, simply focus
		if (this.state.clicked==null) {
			//get available moves first from the clicked square
			let available = chess.moves({square: clickedSquareNotation, verbose: true});

			let availableMoves = [];
			available.forEach(item => {
				availableMoves.push(this.squareNotationToIndex(item.to));
			});

			this.setState({clicked: i, availableMoves: availableMoves});
			return;
		}

		//unfocus if clicked focused square else make a move:
		if (this.state.clicked===i) {
			this.setState({clicked: null, availableMoves: []});
			return;
		} else {
			let from = this.state.clicked;
			let to = i;
			this.makeMove(from, to);
			return;
		}
	}


	renderSquare(i) {
		let clicked = 0;
		if (this.state.clicked===i) {
			clicked=1;
		}
		let isAvailable = false;
		let availableMoves = this.state.availableMoves;

		if(availableMoves.includes(i)) {
			isAvailable = true;
		}

		return(<Square 
			index={i} 
			piece={this.state.pieces[i]} id={i} 
			available={isAvailable}
			is_clicked={clicked} 
			on_click={() => this.handleClick(i)} key={`square_`+i} />);
	}

	renderRow(firstIndex, flipped=false) {
		let boxes = [];
		for(let i=firstIndex; i < 8+firstIndex; i++) {
			boxes.push(this.renderSquare(i));
		}

		if(flipped) {
			boxes.reverse();
		}

		return (<div className="chess-row" key={`row`+firstIndex}>{boxes}</div>);
	}

	makeBoard() {
		let flipped = this.state.isFlipped;

		let rows = [];

		let rowIndexes = [0,1,2,3,4,5,6,7];

		if(flipped) {
			rowIndexes.reverse();
		}

		rowIndexes.forEach((item) => {
			rows.push(this.renderRow(item*8, flipped));
		});

		return (<div>{rows}</div>);
	}

	render() {
		return(
				<>
					{this.makeBoard()}
					<br />
					<button onClick={() => this.flipTheBoard()}>Flip the board</button>
				</>
	  		);
  	}
}

export default Board;