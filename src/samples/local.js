import { React, useState } from 'react';
import Game from './../components/game';

function Local(props) {

	const [gameData, setGameData] = useState({ type: "local", playerInfo:[{name: "Player 1"}, {name: "Player 2"}] });

	return(
		<>
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