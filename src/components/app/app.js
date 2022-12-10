import { React, useState } from 'react';
import Game from './../game/game';

function App(props) {

	/* gameType = local or online */

	const [gameData, setGameData] = useState({ type: "local" });
	// const [gameData, setGameData] = useState({ type: "online", player: "w" });

	/* no calls needed for local game, online game needs move calls */
	// below functions will be used for move calls, only for gameType online games
	const opponentMove = () => {
		// to do
	}

	const listenPlayerMove = (move) => {
		console.log("playerMoved this", move);
	}

	return(<>
			<h2>Game Type: {gameData.type}</h2>
			<br />
			<Game gameData={gameData} playerMoveCallback={listenPlayerMove} />
		</>);
}

export default App;