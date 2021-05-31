import React from 'react';
import './square.css';

class Square extends React.Component {

	//get class name to be added by particular piece value for css purposes
	getPieceClassName(value) {
		//ideally a dictionary like this will be created for mapping:
		//let pieces = {bP: "blackP",bR: "blackR", wP: "whiteP"};

		//but for now using short logical trick:
		var x = String(value);
		return x.replace("b", "black").replace("w", "white");
	}

	pieceClicked(id) {
		return this.props.on_click();
	}

	render() {

		const pieceClass = this.getPieceClassName(this.props.piece);
		//add focus class if it is in clicked state
		const focusClass = this.props.is_clicked ? "focus" : "not-focused";

  		return (
  	    	<button className={`square ${this.props.color} ${pieceClass} ${focusClass}`}
  	    	onClick={() => this.pieceClicked(this.props.id)}></button>
    	)
  	}
}

export default Square;