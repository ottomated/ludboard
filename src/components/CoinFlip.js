import React from 'react';
import { Grid, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/App.css';
import { Settings as UserSettings } from '../store';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		'& h4': {
			margin: '2vw'
		},
		'& iframe': {
			flexGrow: 1,
			border: 'none'
		}
	}
});

export default function CoinFlip({ shown }) {
	const settings = React.useContext(UserSettings.State);
	const classes = useStyles();
	const flipData = React.useRef({ lastResult: "HEADS", result: "HEADS", flipCount: 0, turns: 0, startDate: new Date() });

	const requestRef = React.useRef();
	const [, setState] = React.useState(0);
	const [isStill, setIsStill] = React.useState(true);
	const animate = () => {
		setState(a => a + 1);
		requestRef.current = requestAnimationFrame(animate);
	}
	React.useEffect(() => {
		return () => cancelAnimationFrame(requestRef.current);
	}, []);

	var d = new Date() - flipData.current.startDate;

	var flipTime = parseInt(settings.flipTime);
	if (isNaN(flipTime)) flipTime = 2500;
	var imageFrame, angle;
	if (isStill) {
		imageFrame = ("HEADS" === flipData.current.result ? 0 : 9);
		angle = 0;
	} else {
		imageFrame = (("HEADS" === flipData.current.lastResult ? 0 : 9) + Math.round(d / flipTime * flipData.current.flipCount * 18)) % 18;
		angle = d / flipTime * 2 * Math.PI * flipData.current.turns;
	}

	return (
		<Grid item xs={10} className={classes.root} style={{ display: shown ? 'flex' : 'none' }}>
			<Typography variant="h4">Coin Flip</Typography>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
				<Paper style={{
					width: '50%',
					padding: '5vh',
					margin: '0 auto',
					textAlign: 'center'
				}}>
					<div style={{ width: 150, height: 150, backgroundImage: 'url(coin_sheet.png)', backgroundPositionY: 150 * imageFrame, transform: `rotate(${angle}rad)`, margin: '0 auto' }} />
					<Button variant="contained" disabled={!isStill} color="primary" style={{ margin: '20px auto 0 auto' }} onClick={() => {
						setIsStill(false);
						requestRef.current = requestAnimationFrame(animate);
						flipData.current.result = .5 > Math.random() ? "HEADS" : "TAILS";
						flipData.current.flipCount = ((flipData.current.result === flipData.current.lastResult ? 2 : 1) + (4 + 2 * Math.floor(2 * Math.random()))) * (.5 > Math.random() ? -.5 : .5);
						flipData.current.turns = (1 + Math.floor(4 * Math.random())) * (.5 > Math.random() ? -1 : 1);
						flipData.current.startDate = new Date();
						setTimeout(() => {
							setIsStill(true);
							flipData.current.lastResult = flipData.current.result;
							cancelAnimationFrame(requestRef.current);
						}, flipTime);
					}}>{isStill ? 'Flip' : 'Flipping...'}</Button>
				</Paper>
			</div>
		</Grid>
	);
}