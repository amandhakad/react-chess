import React from 'react';
import './square.css';


//get class name to be added by particular piece value for css purposes
function getPieceClassName(value) {
	//ideally a dictionary like this will be created for mapping:
	//let pieces = {bP: "blackP",bR: "blackR", wP: "whiteP"};

	//but for now using short logical trick:
	var x = String(value);
	return x.replace("b", "black").replace("w", "white");
}

function Square(props) {

		const pieceClass = getPieceClassName(props.piece);
		//add focus class if it is in clicked state
		const focusClass = props.is_clicked ? "focus" : "not-focused";

  		return (
  	    	<button className={`square ${props.color} ${pieceClass} ${focusClass}`}
  	    	onClick={props.on_click}></button>
    	)
  	
}

export default Square;