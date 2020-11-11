import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	title: '',
	note: '',
	active: false,
	titleArray: [
		{id: 10, name: 'context',value: 'Ситуация'},
		{id: 11, name: 'feelings',value: 'Чувства'},
		{id: 12, name: 'body',value: 'Тело'},
		{id: 13, name: 'thought',value: 'Мысли'},
		{id: 14, name: 'isItFamiliar',value: 'Знакомо ли'},
		{id: 15, name: 'desicion',value: 'Решение'},
		{id: 16, name: 'conclusion',value: 'Вывод'},

	],

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

const setActive = (state, action) => {
	return updateObject(state, {
		active: action.active
	})
}

// const saveNote = (state, action) => {
// 	return updateObject(state, {
// 		title: action.title,
// 		value: action.value,
// 	})
// }

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_TITLE: return setTitle(state, action);
		case actionTypes.SET_VALUE: return setValue(state, action);
		case actionTypes.SET_ACTIVE: return setActive(state, action);
		// case actionTypes.SAVE_NOTE: return saveNote(state, action);
		default:
			return state;
	}
}

export default reducer;