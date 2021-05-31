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
		this.state = {pieces: starting_position, clicked: null, available_moves: []};
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
			on_click={() => this.handleClick(i)} />);

	}
	render() {
		return(<div>
				<div className="chess-row"> 
					{this.renderSquare(0,"light")}
					{this.renderSquare(1,"dark")}	
					{this.renderSquare(2,"light")}
					{this.renderSquare(3,"dark")}
					{this.renderSquare(4,"light")}
					{this.renderSquare(5,"dark")}
					{this.renderSquare(6,"light")}
					{this.renderSquare(7,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(8,"dark")}	
					{this.renderSquare(9,"light")}
					{this.renderSquare(10,"dark")}
					{this.renderSquare(11,"light")}
					{this.renderSquare(12,"dark")}
					{this.renderSquare(13,"light")}
					{this.renderSquare(14,"dark")}
					{this.renderSquare(15,"light")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(16,"light")}
					{this.renderSquare(17,"dark")}	
					{this.renderSquare(18,"light")}
					{this.renderSquare(19,"dark")}
					{this.renderSquare(20,"light")}
					{this.renderSquare(21,"dark")}
					{this.renderSquare(22,"light")}
					{this.renderSquare(23,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(24,"dark")}	
					{this.renderSquare(25,"light")}
					{this.renderSquare(26,"dark")}
					{this.renderSquare(27,"light")}
					{this.renderSquare(28,"dark")}
					{this.renderSquare(29,"light")}
					{this.renderSquare(30,"dark")}
					{this.renderSquare(31,"light")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(32,"light")}
					{this.renderSquare(33,"dark")}	
					{this.renderSquare(34,"light")}
					{this.renderSquare(35,"dark")}
					{this.renderSquare(36,"light")}
					{this.renderSquare(37,"dark")}
					{this.renderSquare(38,"light")}
					{this.renderSquare(39,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(40,"dark")}	
					{this.renderSquare(41,"light")}
					{this.renderSquare(42,"dark")}
					{this.renderSquare(43,"light")}
					{this.renderSquare(44,"dark")}
					{this.renderSquare(45,"light")}
					{this.renderSquare(46,"dark")}
					{this.renderSquare(47,"light")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(48,"light")}
					{this.renderSquare(49,"dark")}	
					{this.renderSquare(50,"light")}
					{this.renderSquare(51,"dark")}
					{this.renderSquare(52,"light")}
					{this.renderSquare(53,"dark")}
					{this.renderSquare(54,"light")}
					{this.renderSquare(55,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(56,"dark")}	
					{this.renderSquare(57,"light")}
					{this.renderSquare(58,"dark")}
					{this.renderSquare(59,"light")}
					{this.renderSquare(60,"dark")}
					{this.renderSquare(61,"light")}
					{this.renderSquare(62,"dark")}
					{this.renderSquare(63,"light")}
		  		</div>
	  		</div>
	  		);
  	}
}

ReactDOM.render(
	<Board />,
	document.getElementById('root')
	);

