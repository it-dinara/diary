import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	postId: ''
}

const setPostId = (state, action) => {
	return updateObject(state, {postId: action.postId})
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_POST_ID: return setPostId(state, action);
		default: 
			return state;
	}
}

export default reducer;