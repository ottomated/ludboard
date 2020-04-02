import React from 'react';
import { Grid, Typography, LinearProgress, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/App.css';
import Countdown from 'react-countdown';
import TwitchContext from '../twitch';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

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
		},
		'& .poll': {
			width: '50%',
			padding: '5vh',
			margin: '0 auto'
		},
		'& .b30': {
			marginBottom: 30
		},
		'& .bottom': {
			display: 'flex',
			justifyContent: 'space-evenly'
		},
	},
});

function reduce(state, action) {
	if (action === undefined) {
		return state + 1;
	} else {
		return action;
	}
}

export default function Poll({ shown }) {
	const twitch = React.useContext(TwitchContext);
	const open = React.useRef(false);
	const [aVotes, setAVotes] = React.useReducer(reduce, 0);
	const [bVotes, setBVotes] = React.useReducer(reduce, 0);
	const [endDate, setEndDate] = React.useState(null);
	const classes = useStyles();
	const [won, setWon] = React.useState(false);
	const voted = React.useRef(new Set());

	const { width, height } = useWindowSize();


	let aVal, bVal;
	if (aVotes === 0 && bVotes === 0) {
		aVal = 50;
		bVal = 50;
	} else {
		aVal = aVotes / (aVotes + bVotes) * 100;
		bVal = bVotes / (aVotes + bVotes) * 100;
	}

	const handleMessage = (msg) => {
		if (!open.current) return;
		if (voted.current.has(msg.user)) return;
		voted.current.add(msg.user)
		if (msg.text === '1')
			setAVotes();
		else if (msg.text === '2')
			setBVotes();
	};

	React.useEffect(() => {
			twitch.client.on('msg', handleMessage);
			return () => twitch.client.off('msg', handleMessage);
	}, [twitch.client]);

	return (
		<Grid item xs={10} className={classes.root} style={{ display: shown ? 'flex' : 'none' }}>
			<Confetti width={width} height={height} run={won} style={{ display: won ? 'block' : 'none' }} />
			<Typography variant="h4">50 / 50</Typography>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
				<Paper className="poll">
					<Typography align="center" variant="h6" className="b30">Type 1 or 2 in chat to vote. Reach 50% - 50%!</Typography>
					<Typography>1<span style={{ float: "right" }}>{aVotes} - {aVal.toFixed(2)}%</span></Typography>
					<LinearProgress variant="determinate" value={aVal} className="b30" />
					<Typography>2<span style={{ float: "right" }}>{bVotes} - {bVal.toFixed(2)}%</span></Typography>
					<LinearProgress variant="determinate" value={bVal} className="b30" />
					<div className="bottom">
						<Typography variant="h5" component="code" display="block">
							{aVotes + bVotes} vote{(aVotes + bVotes === 1) ? "" : "s"}
						</Typography>
						{endDate === null ?
							<Typography variant="h5" component="code" display="block">
								1:00.000
							</Typography> :
							<Countdown
								date={endDate}
								intervalDelay={0}
								precision={3}
								onComplete={() => {
									open.current = false;
									if (aVotes === bVotes && aVotes > 0)
										setWon(true);
								}}
								renderer={({ minutes, seconds, milliseconds }) =>
									<Typography variant="h5" component="code" display="block">
										{minutes}:{seconds.toString().padStart(2, '0')}.{milliseconds.toString().padEnd(3, '0')}
									</Typography>
								}
							/>
						}
					</div>
				</Paper>
			</div>
			<Button variant="contained" color="primary" style={{ width: 0, margin: '20px auto' }} onClick={() => {
				setWon(false);
				if (endDate === null) {
					open.current = true;
					voted.current = new Set();
					setEndDate(Date.now() + 60000);
				} else {
					setEndDate(null);
					setAVotes(0);
					setBVotes(0);
					open.current = false;
				}
			}}>
				{endDate === null ? 'Start' : 'Reset'}
			</Button>
		</Grid>
	);
}