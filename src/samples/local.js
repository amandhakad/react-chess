import { React, useState, useRef } from 'react';
import Game from './../components/game';

function Local(props) {

	const [gameData, setGameData] = useState({ type: "local" });

	return(
		<>
			<h2>Game Type: {gameData.type}</h2>
			<br />
			<Game gameData={gameData} />
		</>
		);
}

export default Local;