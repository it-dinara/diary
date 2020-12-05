import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    diaryId: '',
    fetchedPostsRes: [],
    date: '',
    newDate: ''
}


const saveDiaryStart = (state, action) => {
	return updateObject(state, { loading: true })
}

const saveDiaryFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const setDate = (state, action) => {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDate();
    const hour = data.getHours();
    const minutes = data.getMinutes();
    
    const dateBeauty = (num) => {
        const newNum = num + 1;
        let res = '';
        if(newNum.toString().length < 2) {
            res = '0' + newNum
        } else {
            res = newNum
        }
        return res
    }
    const d =  Date.parse(data)
    const fullDate = day + '.' + dateBeauty(month) + '.' + year + ' ' + hour + ':' + dateBeauty(minutes)

    return {
        ...state,
        date: fullDate,
        newDate: d
    }
}

const saveDiarySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        diaryId: action.diaryId,
    })
}

const fetchPostsStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchPostsFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const fetchPostsSuccess = (state, action) => {
    const fetchedPostsRes = []
    console.log('action.fetchedPosts', action.fetchedPosts)
    for(let key in action.fetchedPosts) {
        fetchedPostsRes.push({
            ...action.fetchedPosts[key],
            id: key,
        })
    }
    return {
        ...state,
        loading: false,
        fetchedPostsRes: fetchedPostsRes
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_DIARY_START: return saveDiaryStart(state, action);
        case actionTypes.SAVE_DIARY_FAIL: return saveDiaryFail(state, action);
        case actionTypes.SAVE_DIARY_SUCCESS: return saveDiarySuccess(state, action);
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.SET_DATE: return setDate(state, action);

        default: return state
    }
}


export default reducer;