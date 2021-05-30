import React from 'react';
import ReactDOM from 'react-dom';

import Square from './square';

import './index.css';

class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = null;
	}

	renderSquare(i, color) {
		return(<Square color={color}/>);
		
	}
	render() {
		return(<div>
				<div className="chess-row"> 
					{this.renderSquare(0,"light")}
					{this.renderSquare(0,"dark")}	
					{this.renderSquare(0,"light")}
					{this.renderSquare(0,"dark")}
					{this.renderSquare(0,"light")}
					{this.renderSquare(0,"dark")}
					{this.renderSquare(0,"light")}
					{this.renderSquare(0,"dark")}
		  		</div>
	  		</div>
	  		);
  	}
}

ReactDOM.render(
	<Board />,
	document.getElementById('root')
	);

