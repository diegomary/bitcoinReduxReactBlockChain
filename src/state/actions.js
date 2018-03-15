
export const acquire = (newitem) => {
	newitem.signature="AQ";
	return {type: "ACQUIRE",newItem: newitem}

};

export const acquireObj = (propname, newitem) => {
	newitem.signature="AQB";
	return {type: "ACQUIREOBJ",newItem: newitem, propname :propname}

};
  
export const erase = (newitem) => {
	return {type: "ERASE",itemToRemove: newitem }
};


export const increment = (amount) => {	
	return {type: "INCREMENT",amount: amount}
};
  
export const decrement = (amount) => {
	return {type: "DECREMENT",amount: amount }
};