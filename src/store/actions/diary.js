import * as actionTypes from './actionTypes';

export const setValue = (value) => {
	return {
		type: actionTypes.SET_VALUE,
		value: value
	}
}