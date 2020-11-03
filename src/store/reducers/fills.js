import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	title: '',
	note: '',
	titleArray: [
		{link: 'context',name: 'Ситуация'},
		{link: 'fills',name: 'Чувства'},
		{link: 'body',name: 'Тело'},
		{link: 'thought',name: 'Мысли'},
		{link: 'isItFamiliar',name: 'Знакомо ли'},
		{link: 'desicion',name: 'Решение'},
		{link: 'conclusion',name: 'Вывод'},

	],

}

const setTitle = (state, action) => {
	return updateObject(state, {
		title: action.title
	})
}

const saveNote = (state, action) => {
	return updateObject(state, {
		title: action.title,
		note: action.note,
	})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_TITLE: return setTitle(state, action);
		case actionTypes.SAVE_NOTE: return saveNote(state, action);
		default:
			return state;
	}
}

export default reducer;