import axios from '../../axios-diary.js';
import * as actionTypes from './actionTypes';


export const saveDiaryStart = () => {
    return {
        type: actionTypes.SAVE_DIARY_START
    }
}

export const saveDiaryFail = (error) => {
    return {
        type: actionTypes.SAVE_DIARY_FAIL,
        error
    }
}

export const saveDiarySuccess = (id, diary) => {
    return {
        type: actionTypes.SAVE_DIARY_SUCCESS,
        diaryId: id,
        diary
    }
}

export const saveDiary = (diaryData, token) => {
    return dispatch => {
        dispatch(saveDiaryStart());
        axios.post('/diary.json?auth=' + token, diaryData)
            .then(response => {
                dispatch(saveDiarySuccess(response.data.name, diaryData))
            })
            .catch(error => {
                dispatch(saveDiaryFail(error))
            })
    }
}