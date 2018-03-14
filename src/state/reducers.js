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

const reducers = combineReducers({
	wallet:wallet	
});

export default reducers