import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/App.css';

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
	},

});

var everShown = false;

export default function PhysicsFlip({ shown }) {
	const classes = useStyles();
	if (shown) {
		everShown = true;
	}
	return (
		<Grid item xs={10} className={classes.root} style={{ display: shown ? 'flex' : 'none' }}>
			<Typography variant="h4">Physics Flip</Typography>
			{everShown ? <iframe title="physics" src="./coinflip/CoinFlip.html" /> : null}
		</Grid>
	);
}