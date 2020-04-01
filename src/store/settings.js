import React, {createContext} from 'react';

const State = createContext();
const Dispatch = createContext();

const reducer = (state, action) => {
	let newState = {
		...state,
		...action
	};
	window.localStorage.settings = JSON.stringify(newState);
	return newState;
}

const Provider = ({ children }) => {
	let settings;
	if (window.localStorage.settings) settings = JSON.parse(window.localStorage.settings);
	else settings = { tab: 0, accessToken: '', flipTime: 2500 };
	const [state, dispatch] = React.useReducer(reducer, settings);

	return (
		<State.Provider value={state}>
			<Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
		</State.Provider>
	);
}

export const Settings = {
	State,
	Dispatch,
	Provider
};