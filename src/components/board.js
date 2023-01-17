import Square from './square';
import './../assets/css/board.css';

function Board(props) {

    const flipped = props.isFlipped;

    const renderSquare = (i) => {
        let clicked = 0;
        if (props.clickedSquare===i) {
            clicked=1;
        }
        let isAvailable = false;
        let availableMoves = props.availableMoves;

        if(availableMoves.includes(i)) {
            isAvailable = true;
        }

        return(<Square 
            index={i} 
            piece={props.pieces[i]} id={i} 
            available={isAvailable}
            is_clicked={clicked} 
            on_click={() => props.on_click(i)} 
            key={`square_`+i} />);
    }

    const renderRow = (firstIndex, flipped=false) => {
        let boxes = [];
        for(let i=firstIndex; i < 8+firstIndex; i++) {
            boxes.push(renderSquare(i));
        }

        if(flipped) {
            boxes.reverse();
        }

        return (<div className="chess-row" key={`row`+firstIndex}>{boxes}</div>);
    }

    const makeBoard = () => {

        let rows = [];
        let rowIndexes = [0,1,2,3,4,5,6,7];

        if(flipped) {
            rowIndexes.reverse();
        }

        rowIndexes.forEach((item) => {
            rows.push(renderRow(item*8, flipped));
        });

        return (<div className="container-board">{rows}</div>);
    }

    return (makeBoard());
}

export default Board;