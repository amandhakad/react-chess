import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square';
import './index.css';

import { Chess } from 'chess.js';

class Board extends React.Component {

	constructor(props) {
		super(props);

		//we will get the fen on every move from library
		const chess = new Chess();
		const fen = chess.fen();
		const board = chess.board();

		let startingPieces = this.makePiecesArray(board);
		this.state = {pieces: startingPieces, fen: fen, clicked: null, available_moves: [], isFlipped: false};
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

	flipTheBoard() {
		this.setState({isFlipped: !(this.state.isFlipped)});
	}

	makeMove(to) {
			const chess = new Chess();
			chess.load(this.state.fen);
			chess.move({ from: this.squareIndexToNotation(this.state.clicked), to: this.squareIndexToNotation(to) });
			const fen = chess.fen();
			const board = chess.board();
			let piecesArray = this.makePiecesArray(board);
			this.setState({pieces: piecesArray, fen: fen, clicked: null});
			return true;
	}

	//updating state on clicking square component
	handleClick(i) {
		//if no square is clicked, simply focus
		if (this.state.clicked==null) {
			this.setState({clicked: i});
			return;
		}

		//unfocus if clicked focused square else make a move:
		if (this.state.clicked===i) {
			this.setState({clicked: null});
			return;
		} else {
			let from = this.state.clicked;
			let to = i;
			this.makeMove(to);
			return;
		}
	}


	renderSquare(i, color) {
		let clicked = 0;
		if (this.state.clicked===i) {
			clicked=1;
		}
		return(<Square color={color} 
			piece={this.state.pieces[i]} id={i} 
			is_clicked={clicked} 
			on_click={() => this.handleClick(i)} key={`square_`+i} />);
	}

	renderRow(firstIndex) {
		let boxes = [];
		for(let i=firstIndex; i < 8+firstIndex; i++) {
			let colors = (firstIndex%16===0) ? { first: "light", second: "dark" } : { first: "dark", second: "light" };
			let color = (i%2===0 ) ? colors.first : colors.second;
			boxes.push(this.renderSquare(i, color));
		}

		if(this.state.isFlipped) {
			boxes.reverse();
		}

		return (<div className="chess-row" key={`row`+firstIndex}>{boxes}</div>);
	}

	makeBoard() {
		let rows = [];
		for(let i = 0; i < 8; i++) {
			rows.push(this.renderRow(i*8));
		}

		if(this.state.isFlipped) {
			rows.reverse();
		}
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

ReactDOM.render(
	<Board />,
	document.getElementById('root')
	);

