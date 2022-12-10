import { React, useState, useRef } from 'react';
import Game from './../components/game';

function Local(props) {

	const gameRef = useRef(null);

	/* gameType = local or online */

	const [gameData, setGameData] = useState({ type: "local" });

	const opponentMove = (from, to) => {
		// Expects chess notation: Example: from = e2, to = e4
		gameRef.current.handleOpponentMoveForOnlineGame(from, to);
	}

	const listenPlayerMove = (move) => {
		console.log("playerMoved this", move);
	}

	return(
		<>
			<h2>Game Type: {gameData.type}</h2>
			<br />
			<Game gameData={gameData} playerMoveCallback={listenPlayerMove} ref={gameRef} />
		</>
		);
}

export default Local;