import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	postNote: '',
	postDate: '',
	postMillsec: '',
}

const setPostDataToRead = (state, action) => {
	return updateObject(state, {
		postNote: action.postNote,
		postDate: action.postDate,
		postMillsec: action.postMillsec,
	})
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_POST_DATA_TO_READ: return setPostDataToRead(state, action);
		default: 
			return state;
	}
}

export default reducer;