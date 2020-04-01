import React from 'react';
import { Grid, Typography, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Twitch, Send } from 'mdi-material-ui';
import '../css/App.css';
import { Settings as UserSettings } from '../store';
import TwitchContext from '../twitch';

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
		'& .MuiTextField-root': {
			width: '50%',
			margin: '2vw'
		}
	},

});

export default function Settings({ shown }) {
	const classes = useStyles();
	const twitch = React.useContext(TwitchContext);
	const settings = React.useContext(UserSettings.State);
	const setSettings = React.useContext(UserSettings.Dispatch);
	return (
		<Grid item xs={10} className={classes.root} style={{ display: shown ? 'flex' : 'none' }}>
			<Typography variant="h4">Settings</Typography>
			<TextField
				value={settings.accessToken}
				onChange={(ev) => setSettings({ accessToken: ev.target.value })}
				variant="outlined"
				type="password"
				label="Access Token"
				InputProps={{
					startAdornment: <InputAdornment position="start"><Twitch /></InputAdornment>,
					endAdornment: <InputAdornment position="start"><IconButton onClick={() => {
						twitch.connect(settings.accessToken);
					}}><Send /></IconButton></InputAdornment>,
				}}
			/>
			<TextField
				value={settings.flipTime}
				onChange={(ev) => {
					let rgx = /^[0-9]+$/;
					if (ev.target.value === '' || rgx.test(ev.target.value))
						setSettings({ flipTime: ev.target.value });
				}}
				variant="outlined"
				placeholder="2500"
				label="Coin Flip Time (milliseconds)"
			/>
		</Grid>
	);
}