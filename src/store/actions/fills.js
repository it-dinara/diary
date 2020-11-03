import * as actionTypes from './actionTypes';

export const setTitle = (title) => {
	return {
		type: actionTypes.SET_TITLE,
		title: title
	}
}

export const saveNote = (title, note) => {
	localStorage.setItem(title, note)
	return {
		type: actionTypes.SAVE_NOTE
	}
}
