import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Box } from '@material-ui/core';
import { Close, Remove } from '@material-ui/icons';

const gui = window.require('nw.gui');
const win = gui.Window.get();

const useStyles = makeStyles(theme => ({
	root: {
		WebkitAppRegion: 'drag',
		width: '100vw',
		height: '64px',
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'flex-end',
		'& > button': {
			WebkitAppRegion: 'no-drag',
			height: 48,
			opacity: .25
		},
		'& > .close': {
			marginRight: 16
		}
	},
}));

export default function TitleBar() {
	const classes = useStyles();
	return (
		<Box display="flex" className={classes.root}>
			<IconButton onClick={() => win.minimize()}>
				<Remove />
			</IconButton>
			<IconButton className='close' onClick={() => win.close()}>
				<Close />
			</IconButton>
		</Box>
	);
}