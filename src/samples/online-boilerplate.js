import { React, useState, useRef } from 'react';
import Game from './../components/game';

function OnlineBoilerplate(props) {

	const gameRef = useRef(null);

	const [gameData, setGameData] = useState({ type: "online", player: "w" });

	// use following functions to make and receive moves
	const opponentMove = (from, to) => {
		// Expects chess notation: Example: from = e2, to = e4
		gameRef.current.handleOpponentMoveForOnlineGame(from, to);
	}

	const listenPlayerMove = (move) => {
		console.log("playerMoved this", move);
	}

	return(
		<>
			<h2 style={{textAlign: 'center'}}>Game Type: {gameData.type}</h2>
			<br />
			<Game gameData={gameData} playerMoveCallback={listenPlayerMove} ref={gameRef} style={{margin: "auto"}}>
				<Game.RenderBoard />
				<Game.Status />
				<Game.ActionBtns />
			</Game>
		</>
		);
}

export default OnlineBoilerplate;