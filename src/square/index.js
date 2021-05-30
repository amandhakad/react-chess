import React from 'react';
import './square.css';
import blackP from './pieces/bP.png';
class Square extends React.Component {

	constructor(props) {
		super(props);
		this.state = null;
	}

	//get class name to be added by particular piece value for css purposes
	getPieceClassName(value) {
		//ideally a dictionary like this will be created for mapping:
		//let pieces = {bP: "blackP",bR: "blackR", wP: "whiteP"};

		//but for now using short logical trick:
		var x = String(value);
		return x.replace("b", "black").replace("w", "white");
	}

	render() {
		const pieceClass = this.getPieceClassName(this.props.piece);
  		return (
  	    	<button className={`square ${this.props.color} ${pieceClass}`}></button>
    	)
  	}
}

export default Square;