import React from 'react';
import {
	Grid, Typography,
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/App.css';
import TwitchUser from './TwitchUser';
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
		}
	}
});
function reduce(state, action) {
	return state.concat(action);
}

export default function Amazon({ shown }) {
	const classes = useStyles();
	const twitch = React.useContext(TwitchContext);
	const [messages, addMessage] = React.useReducer(reduce, []);

	const handleMessage = (msg) => {
		addMessage(msg);
		console.log(msg);
	};

	React.useEffect(() => {
		if (twitch) {
			twitch.on('msg', handleMessage);
			return () => twitch.off('msg', handleMessage);
		}
	}, [twitch]);
	return (
		<Grid item xs={10} className={classes.root} style={{ display: shown ? 'flex' : 'none' }}>
			<Typography variant="h4">Amazon Stream</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Item</TableCell>
							<TableCell>User</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{messages.map(message => (
							<TableRow>
								<TableCell>{message.text}</TableCell>
								<TableCell><TwitchUser user={message.info.userInfo} /></TableCell>
							</TableRow>)
						)}

					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
}