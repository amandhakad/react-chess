import React from 'react';
import ReactDOM from 'react-dom';

import Square from './square';

import './index.css';

class Board extends React.Component {

	constructor(props) {
		super(props);
		let starting_position = Array(64);
		//starting position pieces here
		for (var i = 0; i < starting_position.length; i++) {
			if (i>7 && i<16) {
				starting_position[i] = "bP";
			}
			if (i>47 && i<56) {
				starting_position[i] = "wP";
			}
			starting_position[0] = "bR";
			starting_position[1] = "bK";
			starting_position[2] = "bB";
			starting_position[3] = "bQ";
			starting_position[4] = "bK";
			starting_position[5] = "bB";
			starting_position[6] = "bN";
			starting_position[7] = "bR";

			starting_position[56] = "wR";
			starting_position[57] = "wK";
			starting_position[58] = "wB";
			starting_position[59] = "wQ";
			starting_position[60] = "wK";
			starting_position[61] = "wB";
			starting_position[62] = "wN";
			starting_position[63] = "wR";
		}
		//updating
		this.state = {pieces: starting_position};
	}

	renderSquare(i, color) {

		return(<Square color={color} piece={this.state.pieces[i-1]}/>);
		
	}
	render() {
		return(<div>
				<div className="chess-row"> 
					{this.renderSquare(1,"light")}
					{this.renderSquare(2,"dark")}	
					{this.renderSquare(3,"light")}
					{this.renderSquare(4,"dark")}
					{this.renderSquare(5,"light")}
					{this.renderSquare(6,"dark")}
					{this.renderSquare(7,"light")}
					{this.renderSquare(8,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(9,"dark")}	
					{this.renderSquare(10,"light")}
					{this.renderSquare(11,"dark")}
					{this.renderSquare(12,"light")}
					{this.renderSquare(13,"dark")}
					{this.renderSquare(14,"light")}
					{this.renderSquare(15,"dark")}
					{this.renderSquare(16,"light")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(17,"light")}
					{this.renderSquare(18,"dark")}	
					{this.renderSquare(19,"light")}
					{this.renderSquare(20,"dark")}
					{this.renderSquare(21,"light")}
					{this.renderSquare(22,"dark")}
					{this.renderSquare(23,"light")}
					{this.renderSquare(24,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(25,"dark")}	
					{this.renderSquare(26,"light")}
					{this.renderSquare(27,"dark")}
					{this.renderSquare(28,"light")}
					{this.renderSquare(29,"dark")}
					{this.renderSquare(30,"light")}
					{this.renderSquare(31,"dark")}
					{this.renderSquare(32,"light")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(33,"light")}
					{this.renderSquare(34,"dark")}	
					{this.renderSquare(35,"light")}
					{this.renderSquare(36,"dark")}
					{this.renderSquare(37,"light")}
					{this.renderSquare(38,"dark")}
					{this.renderSquare(39,"light")}
					{this.renderSquare(40,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(41,"dark")}	
					{this.renderSquare(42,"light")}
					{this.renderSquare(43,"dark")}
					{this.renderSquare(44,"light")}
					{this.renderSquare(45,"dark")}
					{this.renderSquare(46,"light")}
					{this.renderSquare(47,"dark")}
					{this.renderSquare(48,"light")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(49,"light")}
					{this.renderSquare(50,"dark")}	
					{this.renderSquare(51,"light")}
					{this.renderSquare(52,"dark")}
					{this.renderSquare(53,"light")}
					{this.renderSquare(54,"dark")}
					{this.renderSquare(55,"light")}
					{this.renderSquare(56,"dark")}
		  		</div>
		  		<div className="chess-row"> 
					{this.renderSquare(57,"dark")}	
					{this.renderSquare(58,"light")}
					{this.renderSquare(59,"dark")}
					{this.renderSquare(60,"light")}
					{this.renderSquare(61,"dark")}
					{this.renderSquare(62,"light")}
					{this.renderSquare(63,"dark")}
					{this.renderSquare(64,"light")}
		  		</div>
	  		</div>
	  		);
  	}
}

ReactDOM.render(
	<Board />,
	document.getElementById('root')
	);

