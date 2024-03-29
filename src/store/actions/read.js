// import * as actionTypes from './actionTypes';
// import axios from "axios";
// import * as actions from "./index";

// export const removePostNote = (postNote) => {
// 	return {
// 		type: actionTypes.REMOVE_NOTE_TO_EDIT,
// 		postNote: postNote,
// 	}
// }

// export const setPostId = (postId) => {
// 	return {
// 		type: actionTypes.SET_POST_ID,
// 		postId: postId,
// 	}
// }

// export const setPostDataToReadStart = () => {
// 	return {
// 		type: actionTypes.SET_POST_DATA_TO_READ_START
// 	}
// }

// export const setPostDataToReadSuccess = (postData) => {
// 	return {
// 		type: actionTypes.SET_POST_DATA_TO_READ_SUCCESS,
// 		postData
// 	}
// }

// export const setPostDataToReadFail = (error) => {
// 	return {
// 		type: actionTypes.SET_POST_DATA_TO_READ_FAIL,
// 		error
// 	}
// }

// export const setPostDataToRead = (token, postId) => {
// 	return dispatch => {
// 		dispatch(setPostDataToReadStart())
// 		const queryParams = '?auth=' + token;
// 		axios.get('https://diary-a95bf.firebaseio.com/journal/' + postId + '.json' + queryParams)
// 		.then(res => {
// 			dispatch(setPostDataToReadSuccess(res.data))
// 			dispatch(actions.setRedirectPath(null))
// 			// console.log('READUX READ RES', res)
// 		})
// 		.catch(error => {
// 			dispatch(setPostDataToReadFail(error))
// 		})
// 	}
// }
