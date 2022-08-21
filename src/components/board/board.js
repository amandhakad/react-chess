import React, {} from 'react';
import Square from './../square/square';

import { Chess } from 'chess.js';
import { squareIndexToNotation, squareNotationToIndex } from './../../helpers/common/common';

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

	componentDidUpdate() {
		//code for available moves
		const chess = new Chess();
		chess.load(this.state.fen);
		let clickedSquareNotation = squareIndexToNotation(this.state.clicked);
		let available = chess.moves({square: clickedSquareNotation, verbose: true});
		let availableMoves = [];
		available.forEach(item => {
			availableMoves.push(squareNotationToIndex(item.to));
		});

		//find a better way for the below comparison (toString will work here fine, but i dont like sort)
		if(this.state.availableMoves.sort().toString()!==availableMoves.sort().toString()) {
			this.setState({availableMoves: availableMoves});
		}
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

	flipTheBoard() {
		this.setState({isFlipped: !(this.state.isFlipped)});
	}

	makeMove(from, to) {
			const chess = new Chess();
			chess.load(this.state.fen);
			let moveRes = chess.move({ from: squareIndexToNotation(from), to: squareIndexToNotation(to) });
			if(moveRes) {
				const fen = chess.fen();
				const board = chess.board();
				let piecesArray = this.makePiecesArray(board);
				this.setState({pieces: piecesArray, fen: fen, clicked: null, availableMoves: []});
				return true;
			} else {
				return false;
			}
			
	}

	//updating state on clicking square component
	handleClick(i) {
		//if no square is already clicked, simply focus
		if (this.state.clicked==null) {
			this.setState({clicked: i});
			return;
		}

		//unfocus if clicked focused square else make a move:
		if (this.state.clicked===i) {
			this.setState({clicked: null, availableMoves: []});
			return;
		}

		let from = this.state.clicked;
		let to = i;

		let move = this.makeMove(from, to);
		// !move means it was not valid move, so just focus the clicked square
		if(!move) {
			this.setState({clicked: i});
		}
		return;
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