import './square.css';
import Piece from './../piece';

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
		//add focus class if it is in clicked state
		const focusClass = props.is_clicked ? "focus" : "not-focused";
		const available = props.available ? "available" : "";

  		return (
  	    	<button className={`square ${props.color} ${focusClass} ${available}`}
  	    	onClick={props.on_click}>
  	    		{renderPiece(props.piece)}
  	    	</button>
    	)
  	
}

export default Square;