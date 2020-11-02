import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	title: '',
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
	console.log('action.title', state)
	return updateObject(state, {
		title: action.title
	})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_TITLE: return setTitle(state, action);
		default:
			return state;
	}
}

export default reducer;