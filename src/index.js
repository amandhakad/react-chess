import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square';
import './index.css';

//importing availableMoves
import availableMoves from './availableMoves.js';


class Board extends React.Component {

	constructor(props) {
		super(props);
		let starting_position = Array(64).fill(null);
		//starting position pieces here
		for (var i = 0; i < starting_position.length; i++) {
			if (i>7 && i<16) {
				starting_position[i] = "bP";
			}
			if (i>47 && i<56) {
				starting_position[i] = "wP";
			}
			starting_position[0] = "bR";
			starting_position[1] = "bN";
			starting_position[2] = "bB";
			starting_position[3] = "bQ";
			starting_position[4] = "bK";
			starting_position[5] = "bB";
			starting_position[6] = "bN";
			starting_position[7] = "bR";

			starting_position[56] = "wR";
			starting_position[57] = "wN";
			starting_position[58] = "wB";
			starting_position[59] = "wQ";
			starting_position[60] = "wK";
			starting_position[61] = "wB";
			starting_position[62] = "wN";
			starting_position[63] = "wR";
		}
		//updating
		//pieces contain the piece name array

		//clicked contain the id of square that is currently clicked or not
		this.state = {pieces: starting_position, clicked: null, available_moves: [], isFlipped: false};
	}

	flipTheBoard() {
		this.setState({isFlipped: !(this.state.isFlipped)});
	}

	checkLegalMove(from, to) {
		//this function will check legality of move
		//return true for now
		return true;
	}

	makeMove(from, to) {
			//check legal move
			let new_state = {...this.state};

			//stop if square selected is empty
			//**later this if to be handled by checkLegalMove**
			if (this.state.pieces[from]==null) {
				new_state.clicked = to;
				this.setState(new_state);
				return 0;
			}

			//first checking legal move or not
			if (this.checkLegalMove(from, to)) {

				//moving the piece
				new_state.pieces[to] = this.state.pieces[from];
				new_state.pieces[from] = null;

				//set state and return
				this.setState(new_state);
				return 1;

			}
			return 0;
	}

	//updating state on clicking square component
	handleClick(i) {

		let new_state = {...this.state};

		//if no square is clicked, simply focus
		if (new_state.clicked==null) {
			new_state.clicked = i;
			this.setState(new_state);
			return;
		}

		//unfocusing if clicked focused square else make a move:
		if (new_state.clicked===i) {

			new_state.clicked = null;
			this.setState(new_state);
			return;

		} else {
			//move will be made here
			//vars
			let from = new_state.clicked;
			let to = i;

			//calling
			let move_response;
			move_response = this.makeMove(from, to);

			//unfocusing if move success
			if (move_response===1) {
				let new_state2 = {...this.state};
				new_state2.clicked = null;
				this.setState(new_state2);
			}
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

