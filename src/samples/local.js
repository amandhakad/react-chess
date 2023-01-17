import { React, useState } from 'react';
import Game from './../components/game';

function Local(props) {

	const [gameData, setGameData] = useState({ type: "local" });

	return(
		<>
			<h2 style={{textAlign: 'center'}}>Game Type: {gameData.type}</h2>
			<br />
			<Game gameData={gameData} style={{margin: "auto"}}>
				<Game.RenderBoard />
				<Game.Status />
				<Game.ActionBtns />
			</Game>
		</>
		);
}

export default Local;