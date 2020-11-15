import * as actionTypes from './actionTypes';

export const setActive = (active) => {
	return {
		type: actionTypes.SET_ACTIVE,
		active: active
	}
}

export const setTitle = (title) => {
	return {
		type: actionTypes.SET_TITLE,
		title: title
	}
}

export const setValue = (value) => {
	return {
		type: actionTypes.SET_VALUE,
		value: value
	}
}

export const saveNote = (title, value) => {
	return {
		type: actionTypes.SAVE_NOTE,
		title: title,
		value: value,
	}
}



