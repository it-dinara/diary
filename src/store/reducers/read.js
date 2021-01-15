import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	postNote: '',
	postDate: '',
	postMillsec: '',
	postId: null,
}

const setPostDataToRead = (state, action) => {
	return updateObject(state, {
		postNote: action.postNote,
		postDate: action.postDate,
		postMillsec: action.postMillsec,
		postId: action.postId,
	})
}
const removePostNote = (state, action) => {
	return updateObject(state, {
		postNote: action.postNote,
	})
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_POST_DATA_TO_READ: return setPostDataToRead(state, action);
		case actionTypes.REMOVE_NOTE_TO_EDIT: return removePostNote(state, action);
		default:
			return state;
	}
}

export default reducer;