import * as actionTypes from './actionTypes';

export const setPostDataToRead = (postNote, postDate, postMillsec, postId) => {
	return {
		type: actionTypes.SET_POST_DATA_TO_READ,
		postNote: postNote,
		postDate: postDate,
		postMillsec: postMillsec,
		postId: postId,
	}
}