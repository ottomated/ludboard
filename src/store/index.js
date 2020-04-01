import React, { cloneElement } from 'react';
import { Settings } from './settings';

const providers = [<Settings.Provider />];

const Store = ({ children: initial }) =>
	providers.reduce(
		(children, parent) => cloneElement(parent, { children }),
		initial
	);

export { Store, Settings };