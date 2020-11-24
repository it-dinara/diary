import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    diaries: []
}

const saveDiaryStart = (state, action) => {
	return updateObject(state, { loading: true })
}

const saveDiaryFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const saveDiarySuccess = (state, action) => {
    const newDiary = updateObject(action.diaryData, {
        id: action.diaryId
    })
    return updateObject(state, {
        loading: false,
        diaries: state.diaries.concat(newDiary),
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_DIARY_START: return saveDiaryStart(state, action);
        case actionTypes.SAVE_DIARY_FAIL: return saveDiaryFail(state, action);
        case actionTypes.SAVE_DIARY_SUCCESS: return saveDiarySuccess(state, action);
        default: return state
    }
}


export default reducer;