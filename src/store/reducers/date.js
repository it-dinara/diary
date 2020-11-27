// import * as actionTypes from '../actions/actionTypes'
// import { updateObject } from '../utility';

// const initialState = {
// 	date: '',
// 	newDate: ''
// }

// const setDate = (state, action) => {
// 	const data = new Date();
// 	const year = data.getFullYear();
// 	const month = data.getMonth();
// 	const day = data.getDate();
// 	const hour = data.getHours();
// 	const minutes = data.getMinutes();
	
// 	const monthRes = (month) => {
// 		const newMonth = month + 1;
// 		let res = '';
// 		if(newMonth.toString().length < 2) {
// 			res = '0' + newMonth
// 		} else {
// 			res = newMonth
// 		}
// 		return res
// 	}
// 	const d =  Date.parse(data)
// 	return {
// 		...state,
// 		date: day + '.' + monthRes(month) + '.' + year + ' ' + hour + ':' + minutes,
// 		newDate: d
// 	}
// }

// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case actionTypes.SET_DATE: return setDate(state, action);
// 		default: return state
// 	}
// }

// export default reducer;