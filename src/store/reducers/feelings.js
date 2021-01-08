import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	title: '',
	note: '',
	active: false,
	titleArray: [
		{id: 0, name: 'context' },
		{id: 1, name: 'feelings' },
		{id: 2, name: 'body' },
		{id: 3, name: 'thought' },
		{id: 4, name: 'isItFamiliar' },
		{id: 5, name: 'decision' },
		{id: 6, name: 'conclusion' },
	],
	diaryObj: {},
}

const setActive = (state, action) => {
	return updateObject(state, {
		active: action.active
	})
}

const setTitle = (state, action) => {
	return updateObject(state, {
		title: action.title
	})
}

const setValue = (state, action) => {
	return updateObject(state, {
		value: action.value
	})
}

const saveNoteInState = (state, action) => {
	console.log('REDUX', action.title, action.value)
	let value = null
	if(action.value) {
		value = action.value
	}
	return {
		...state,
		diaryObj: {
			...state.diaryObj,
			[action.title]: value,
		}
	}
}

const noteInit = (state, action) => {
	const date = new Date();
	console.log('date', date)
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hour = date.getHours();
	const minutes = date.getMinutes();

	const formatDate = (num) => {
	    const newNum = num + 1;
	    let res;
	    if(newNum.toString().length < 2) {
	        res = '0' + newNum
	    } else {
	        res = newNum
	    }
	    return res
	}

	let fullDate = day + '.' + formatDate(month) + '.' + year + ' ' + hour + ':' + formatDate(minutes);
	let millsec =  Date.parse(date);
	return updateObject(state, {
		title: '',
		diaryObj: {},
		fullDate: fullDate,
		millsec: millsec,
	})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_ACTIVE: return setActive(state, action);
		case actionTypes.SET_TITLE: return setTitle(state, action);
		case actionTypes.SET_VALUE: return setValue(state, action);
		case actionTypes.SAVE_NOTE_IN_STATE: return saveNoteInState(state, action);
		case actionTypes.NOTE_INIT: return noteInit(state, action);
		default:
			return state;
	}
}

export default reducer;