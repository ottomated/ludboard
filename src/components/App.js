import React from 'react';
import { Grid, Tabs, Tab, Avatar } from '@material-ui/core';
import '../css/App.css';
import { CoinOutline, Coin, Amazon as AmazonIcon, Poll as PollIcon, Settings as SettingsIcon } from 'mdi-material-ui';
import TitleBar from './TitleBar';
import CoinFlip from './CoinFlip';
import PhysicsFlip from './PhysicsFlip';
import Poll from './Poll';
import Amazon from './Amazon';
import Settings from './Settings';
import { Settings as UserSettings } from '../store';

export default function App() {
	const settings = React.useContext(UserSettings.State);
	const setSettings = React.useContext(UserSettings.Dispatch);
	const handleChange = (_, newValue) => {
		setSettings({ tab: newValue });
	};
	return (
		<>
			<TitleBar />
			<Grid container style={{ height: '100vh' }}>
				<Grid item xs={2} style={{ borderRight: '1px solid rgba(255, 255, 255, 0.12)' }}>
					<Avatar src="ludwig.png" style={{ width: 100, height: 100, margin: '20px auto' }} />
					<Tabs orientation="vertical" centered value={settings.tab} onChange={handleChange}>
						<Tab icon={<CoinOutline />} label="Coin Flip" />
						<Tab icon={<Coin />} label="Physics Flip" />
						<Tab icon={<PollIcon />} label="50 / 50" />
						<Tab icon={<AmazonIcon />} label="Amazon Stream" />
						<Tab icon={<SettingsIcon />} label="Settings" />
					</Tabs>
				</Grid>
				<CoinFlip shown={settings.tab === 0} />
				<PhysicsFlip shown={settings.tab === 1} />
				<Poll shown={settings.tab === 2} />
				<Amazon shown={settings.tab === 3} />
				<Settings shown={settings.tab === 4} />
			</Grid>
		</>
	);
}