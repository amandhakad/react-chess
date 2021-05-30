import React from 'react';
import './square.css';
class Square extends React.Component {

	constructor(props) {
		super(props);
		this.state = null;
	}

	render() {
  		return (
  	    	<button className={`square ${this.props.color}`}></button>
    	)
  	}
}

export default Square;