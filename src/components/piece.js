import bB from './pieceIcons/bB.png';
import bK from './pieceIcons/bK.png';
import bN from './pieceIcons/bN.png';
import bP from './pieceIcons/bP.png';
import bQ from './pieceIcons/bQ.png';
import bR from './pieceIcons/bR.png';

import wB from './pieceIcons/wB.png';
import wK from './pieceIcons/wK.png';
import wN from './pieceIcons/wN.png';
import wP from './pieceIcons/wP.png';
import wQ from './pieceIcons/wQ.png';
import wR from './pieceIcons/wR.png';

//get image from piece value
//mapping images
function getPieceImage(value) {
  let dict = {bB: bB, bK: bK, bN: bN, bP: bP, bQ: bQ, bR: bR, wB: wB, wK: wK, wN: wN, wP: wP, wQ: wQ, wR: wR};
  return dict[value];
}

function Piece(props) {
    const style = props.style ?? {};
    const className = props.className ?? "";
		const pieceImage = getPieceImage(props.value);
  		return (
  	    		 <img className={`${className}`} src={pieceImage} style={{...style}} alt="piece" />
    	)
}

export default Piece;