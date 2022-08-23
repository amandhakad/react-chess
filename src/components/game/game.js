import React, {} from 'react';
import Board from './board';

import { Chess } from 'chess.js';
import { squareIndexToNotation, squareNotationToIndex, makePiecesArray } from './../../helpers/common/common';

class Game extends React.Component {

	constructor(props) {
		super(props);

		//we will get the fen on every move from library
		const chess = new Chess();
		const fen = chess.fen();
		const board = chess.board();

		let startingPieces = makePiecesArray(board);

		this.state = {
			pieces: startingPieces,
			fen: fen, clicked: null,
			availableMoves: [],
			isFlipped: false,
			toMove: 'w',
			gameStatus: "started",
			moveHistory: [fen]
		};

	}

	refreshAvailableMoves(chess) {
		if((this.state.clicked === null) && (this.state.availableMoves.length > 0)) {
			this.setState({availableMoves: []});
		} else if(this.state.clicked!==null) {
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
	}

	setNeededVariables(chess) {
		if(chess.game_over() && this.state.gameStatus !== "end") {
			this.setState({gameStatus: "end"});
			return;
		}
		let toMove = chess.turn();

		let stateToUpdate = {};
		if(toMove!==this.state.toMove) {
			stateToUpdate.toMove = toMove;
		}
		if(Object.keys(stateToUpdate).length > 0) {
			this.setState(stateToUpdate);
		}
	}

	componentDidUpdate() {

		const chess = new Chess();
		chess.load(this.state.fen);

		this.setNeededVariables(chess);
		this.refreshAvailableMoves(chess);
	}

	flipTheBoard() {
		this.setState({isFlipped: !(this.state.isFlipped)});
	}

	undoMove() {
		const chess = new Chess();
		let moveHistory = this.state.moveHistory;

		if(moveHistory.length < 2) {
			return;
		}

		chess.load(moveHistory[moveHistory.length-2]);
		const fen = chess.fen();
		const pieces = makePiecesArray(chess.board());
		moveHistory.pop();
		this.setState({ pieces: pieces, fen: fen, moveHistory: moveHistory});
	}

	makeMove(from, to) {
			const chess = new Chess();
			chess.load(this.state.fen);
			let moveRes = chess.move({ from: squareIndexToNotation(from), to: squareIndexToNotation(to) });
			if(moveRes) {
				const fen = chess.fen();
				const board = chess.board();
				let piecesArray = makePiecesArray(board);
				let moveHistory = this.state.moveHistory;
				moveHistory.push(fen);
				this.setState({pieces: piecesArray, fen: fen, clicked: null, availableMoves: [], moveHistory: moveHistory});
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

	render() {
		return(
				<>
					<Board isFlipped={this.state.isFlipped} clickedSquare={this.state.clicked}
					availableMoves={this.state.availableMoves} pieces={this.state.pieces}
					on_click={(i) => this.handleClick(i)}
					 />
					<br />
					<button onClick={() => this.flipTheBoard()}>Flip the board</button> &nbsp;
					<button onClick={() => this.undoMove()}>Undo</button>
					<h2><b> {
						this.state.gameStatus==='end' ? 
						"Game Over: "+(this.state.toMove==='w' ? "Black wins" : "White wins") : 
						(this.state.toMove==='w' ? "White to move" : "Black to move")
					}</b></h2>
				</>
	  		);
  	}
}

export default Game;