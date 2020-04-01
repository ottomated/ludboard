import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import TwitchContext, { client } from './twitch';
import { Store } from './store';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#23272A',
		},
		primary: {
			main: '#FE9B9E',
		},
		secondary: {
			main: '#FE9B9F',
		},
	},
	typography: {
		fontFamily: "'Source Sans Pro', sans-serif",
	}
});

ReactDOM.render(
	<Store>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TwitchContext.Provider value={client}>
				<App />
			</TwitchContext.Provider>
		</ThemeProvider>
	</Store>,
	document.getElementById('root'));