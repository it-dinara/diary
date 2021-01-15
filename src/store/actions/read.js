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



export const removePostNote = (postNote) => {
	return {
		type: actionTypes.REMOVE_NOTE_TO_EDIT,
		postNote: postNote,
	}
}