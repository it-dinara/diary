import * as actionTypes from './actionTypes';

export const setPostId = (postId) => {
	return {
		type: actionTypes.SET_POST_ID,
		postId: postId
	}
}