const App = () => {
	return (
		<div className="container">
			<Board />
		</div>
	);
};
const Board = () => {
	const [player, setPlayer] = React.useState(1);
	const [state, setState] = React.useState(Array(9).fill(null));
	let playerText = 'Turn of player '
	playerText += player == 0 ? 'two' : 'one';
	let winner = checkWinner(state);
	if (winner != null) {
		console.log('winner ' + winner);
		playerText = 'Player ';
		playerText += winner == 0 ? 'two' : 'one';
		playerText += ' is the winner!!'
		alert(playerText);
		setPlayer(1);
		setState(Array(9).fill(null));
	}
	const newState = idOfSquare => {
		let thePlayer = player;
		state[idOfSquare] = player;
		let nextPlayer = ((player + 1)%2);
		setPlayer(nextPlayer);
		setState(state);
		return thePlayer;
	}
	function checkWinner (state) {
		console.log('state: ' + JSON.stringify(state));
		const winnerStates = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		];
		for (let i = 0; i < winnerStates.length; i++) {
			const [a, b, c] = winnerStates[i];
			if (state[a] != null && state[a] == state[b] && state[b] == state[c] && state[c] == state[a]) {
				return state[a];
			}
		}
		return null;
	}
	function renderSquare (i) {
		return <Square id={i} newState={newState} player={player}></Square>
	}
	return (
		<div>
			<div id="info">
				<h1>{playerText}</h1>
			</div>
			<div className="game-board" onClick={(e) => {
				setPlayer((player + 1)%2);
			}} >
				<div className="grid-row">
					{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
				</div>
				<div className="grid-row">
					{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
				</div>
				<div className="grid-row">
					{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
				</div>
			</div>
		</div>
	);
}
const Square = ({id, newState}) => {
	const [color, setColor] = React.useState('blue');
	const [status, setStatus] = React.useState(null);
	const xo =['0', 'X'];
	const palet = ['red', 'blue'];
	React.useEffect(() => {
		console.log('re-rendered');
		return() => console.log('unmounting');
	});
	return (
		<button onClick={(e) => {
			let nextPlayer = newState(id);
			let col = palet[nextPlayer];
			setStatus(nextPlayer);
			e.target.style.backgroundColor = col;
		}}>{xo[status]}</button>
	);
}
ReactDOM.render(<App />, document.getElementById("root"));