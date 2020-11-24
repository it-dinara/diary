import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	title: '',
	note: '',
	active: false,
	diaryObj: {},
	titleArray: [
		{id: 10, name: 'context' },
		{id: 11, name: 'feelings' },
		{id: 12, name: 'body' },
		{id: 13, name: 'thought' },
		{id: 14, name: 'isItFamiliar' },
		{id: 15, name: 'desicion' },
		{id: 16, name: 'conclusion' },

	],
	// context: ''
	// feelings: ''
	// body: ''
	// thought: ''
	// isItFamiliar: ''
	// desicion: ''
	// conclusion: ''

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
	return {
		...state,
		diaryObj: {
			...state.diaryObj,
			[action.title]: action.value,
		}
	}
}



const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_ACTIVE: return setActive(state, action);
		case actionTypes.SET_TITLE: return setTitle(state, action);
		case actionTypes.SET_VALUE: return setValue(state, action);
		case actionTypes.SAVE_NOTE_IN_STATE: return saveNoteInState(state, action);
		default:
			return state;
	}
}

export default reducer;