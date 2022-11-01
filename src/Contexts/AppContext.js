import React, { createContext, useReducer } from "react";

const AppContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
	    case "TOGGLE_MUTE": {
	      return { ...state, isAppMuted: !state.isAppMuted }; // true or false
	    }
	}
}

export const AppProvider = ({children}) => {
	const initialState = {
		isAppMuted: true,
	}
	const [state, dispatch] = useReducer(reducer, initialState);

	const toggleMute = () => {
		dispatch({type: "TOGGLE_MUTE"})
	}

	return (
		<AppContext.Provider 
			value={{
				toggleMute,
				isAppMuted: state.isAppMuted,
			}}>
			{children}
		</AppContext.Provider>
		)	
}

export default AppContext;