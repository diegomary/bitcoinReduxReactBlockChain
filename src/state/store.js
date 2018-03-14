import {createStore,applyMiddleware, compose}   from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";


export default createStore(
	reducers,
	{		
		wallet: []
	},
	compose(applyMiddleware(thunk))
);