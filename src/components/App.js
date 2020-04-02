import React from 'react';
import { Grid, Tabs, Tab, Avatar, Typography } from '@material-ui/core';
import '../css/App.css';
import { CoinOutline, Coin, Amazon as AmazonIcon, Poll as PollIcon, Settings as SettingsIcon } from 'mdi-material-ui';
import TitleBar from './TitleBar';
import CoinFlip from './CoinFlip';
import PhysicsFlip from './PhysicsFlip';
import Poll from './Poll';
import Amazon from './Amazon';
import Settings from './Settings';
import { Settings as UserSettings } from '../store';
import TwitchContext, { client } from '../twitch';

export default function App() {
	const settings = React.useContext(UserSettings.State);
	const setSettings = React.useContext(UserSettings.Dispatch);
	const [status, setStatus] = React.useState(false);
	const handleChange = (_, newValue) => {
		setSettings({ tab: newValue });
	};

	React.useEffect(() => {
		const toggleStatus = (s) => {
			setStatus(s);
		};
		client.on('status', toggleStatus);
		if (settings.accessToken)
			client.connect(settings.accessToken);
		return () => client.off('status', toggleStatus);
	}, []);

	return (
		<TwitchContext.Provider value={{ client, status }}>
			<TitleBar />
			<Grid container style={{ height: '100vh' }}>
				<Grid item xs={2} style={{ borderRight: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', flexDirection: 'column' }}>
					<Avatar src="ludwig.png" style={{ width: 100, height: 100, margin: '20px auto' }} />
					<Tabs orientation="vertical" centered value={settings.tab} onChange={handleChange} style={{ flexGrow: 1 }}>
						<Tab icon={<CoinOutline />} label="Coin Flip" />
						<Tab icon={<Coin />} label="Physics Flip" />
						<Tab icon={<PollIcon />} label="50 / 50" />
						<Tab icon={<AmazonIcon />} label="Amazon Stream" />
						<Tab icon={<SettingsIcon />} label="Settings" />
					</Tabs>
					<Typography align="center">{status ? `Connected to ${client.user.displayName}` : "Disconnected"}</Typography>
				</Grid>
				<CoinFlip shown={settings.tab === 0} />
				<PhysicsFlip shown={settings.tab === 1} />
				<Poll shown={settings.tab === 2} />
				<Amazon shown={settings.tab === 3} />
				<Settings shown={settings.tab === 4} />
			</Grid>
		</TwitchContext.Provider>
	);
}