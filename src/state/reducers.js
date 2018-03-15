import {combineReducers} from "redux";

const wallet = (state = [], action) => {  
	const newState = [...state]; // Es6 array cloning
	switch (action.type) {
	case "ACQUIRE":	
		newState.push(action.newItem);
		return newState;   
	case "ERASE": 
		break;		
	default:
		return state;
	}
};



const walletObject = ( state = {}, action) => {

	const newState = { Wallet: state.Wallet}
	switch (action.type) {
	case "ACQUIREOBJ":	
	Object.defineProperty(newState.Wallet, action.propname, {value:action.newItem });
	return newState;

	case "ERASE": 
		break;		
	default:
		return state;
	}
};








const counter =(state = 0 , action) => {
	switch (action.type) {
		case "INCREMENT":			
			return state + action.amount;   
		case "DECREMENT": 
			return state - action.amount;   		
		default:
			return state;
		}
}

const reducers = combineReducers({
	wallet:wallet,
	walletObject:walletObject,
	counter:counter	
});

export default reducers