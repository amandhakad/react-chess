import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board/board';
import './index.css';

import { Chess } from 'chess.js';



ReactDOM.render(
	<Board />,
	document.getElementById('root')
	);

