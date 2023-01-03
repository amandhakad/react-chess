import Piece from './piece';
import { useState, useEffect } from 'react';

//render piece component if not null
function renderPiece(value) {
	if (value == null) {
		return;
	} else {
		return (
			<Piece value={value} />
		);
	} 
}

function Square(props) {

	const [color, setColor] = useState(null);

	useEffect(() => {
		let index = props.index;

		let row = Math.floor(index/8);
		let column = index%8;
		
		let colors = {main: "light", alt: "dark"};
		if(row%2!==0) {
			colors = {main: "dark", alt: "light"}
		}

		if(column%2===0) {
			setColor(colors.main);
		} else {
			setColor(colors.alt);
		}

	}, [props.index]);
    	


	//add focus class if it is in clicked state
	const focusClass = props.is_clicked ? "focus" : "not-focused";
	const available = props.available ? "available" : "";

	return (
	    <button className={`square ${color} ${focusClass} ${available}`}
	    	onClick={props.on_click}>
	    	{renderPiece(props.piece)}
	    </button>
	)
  	
}

export default Square;