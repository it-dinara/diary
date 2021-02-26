import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    postData: {
        fullDate: null,
        millsec: null,
        note: {},
        userId: null,
    },
    postId: null,
}

const setPostId = (state, action) => {
    return updateObject(state, {
        postId: action.postId
    })
}

const setPostDataToReadStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        postData: null,
    })
}

const setPostDataToReadSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        postData: action.postData
    })
}

const setPostDataToReadFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const removePostNote = (state, action) => {
    return updateObject(state, {
        postNote: action.postNote,
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REMOVE_NOTE_TO_EDIT:
            return removePostNote(state, action);
        case actionTypes.SET_POST_ID:
            return setPostId(state, action);
        case actionTypes.SET_POST_DATA_TO_READ_START:
            return setPostDataToReadStart(state, action);
        case actionTypes.SET_POST_DATA_TO_READ_SUCCESS:
            return setPostDataToReadSuccess(state, action);
        case actionTypes.SET_POST_DATA_TO_READ_FAIL:
            return setPostDataToReadFail(state, action);
        default:
            return state;
    }
}

export default reducer;