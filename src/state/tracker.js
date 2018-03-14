import {acquire} from "./actions";

export const TrackState = (store, pageName) => { 
	let pageVisited = JSON.parse(JSON.stringify(store.getState().pageVisited));
	pageVisited.pageNumber ++ ;
	pageVisited.pageNames.push(pageName);
	store.dispatch(acquire(pageVisited));
	console.log(store.getState());
}

