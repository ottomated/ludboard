import React from 'react';
import {
	Grid, Typography, IconButton,
	TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/App.css';
import TwitchUser from './TwitchUser';
import TwitchContext from '../twitch';
import { OpenInApp } from 'mdi-material-ui';
import open from 'open';

import Worker from '../amazon.worker.js';
const worker = new Worker();

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

	const handleMessage = async (msg) => {
		worker.postMessage(msg);
	};

	React.useEffect(() => {
		worker.addEventListener('message', event => {
			console.log("payload", event.data);
			addMessage(event.data);
		});
		twitch.client.on('msg', handleMessage);
		return () => twitch.client.off('msg', handleMessage);
	}, [twitch.client]);
	
	return (
		<Grid item xs={10} className={classes.root} style={{ display: shown ? 'flex' : 'none', height: '100vh' }}>
			<Typography variant="h4">Amazon Stream</Typography>
			<TableContainer>
				<Table size="small" stickyHeader>
					<TableHead style={{background: '#23272A'}}>
						<TableRow>
							<TableCell style={{ width: '50%' }}>Item</TableCell>
							<TableCell style={{ width: '10%' }}>Availability</TableCell>
							<TableCell style={{ width: '10%' }}>Price</TableCell>
							<TableCell style={{ width: '20%' }}>User</TableCell>
							<TableCell style={{ width: '10%' }}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{messages.map((row) => (
							<TableRow key={row.details.url} hover>
								<TableCell>{row.details.title}</TableCell>
								<TableCell style={getStockStyles(row.details.availability)}>{row.details.availability}</TableCell>
								<TableCell>{row.details.price}</TableCell>
								<TableCell><TwitchUser user={row.msg.info.userInfo} /></TableCell>
								<TableCell><IconButton onClick={() => open(row.details.url)}><OpenInApp /></IconButton></TableCell>
							</TableRow>)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
}

function getStockStyles(availability) {
	availability = availability.toLowerCase();
	if (availability === 'in stock.') {
		return {
			color: '#27ae60',
			fontWeight: 'bold'
		};
	} else if (availability.includes('unavailable')) {
		return {
			color: '#7f8c8d'
		};
	} else {
		return {
			color: '#f39c12'
		};
	}
}