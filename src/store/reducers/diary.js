import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    diaryId: [],
}


const saveDiaryStart = (state, action) => {
	return updateObject(state, { loading: true })
}

const saveDiaryFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const saveDiarySuccess = (state, action) => {
    const newDiaryId = updateObject(action.diaryData, {
        id: action.diaryId
    })
    return updateObject(state, {
        loading: false,
        diaryId: state.diaryId.concat(newDiaryId),
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