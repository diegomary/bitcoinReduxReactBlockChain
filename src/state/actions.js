
export const acquire = (newitem) => {
	newitem.signature="AQ";
	return {type: "ACQUIRE",newItem: newitem}

};
  
export const erase = (newitem) => {
	return {type: "ERASE",itemToRemove: newitem }
};