import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    loading: false,
    removing: false,
    fetchedPostsRes: [],
    diaryId: '',
    date: '',
    newDate: '',
    title: '',
    active: false,
    titleArray: [
        {id: 0, name: 'context'},
        {id: 1, name: 'feelings'},
        {id: 3, name: 'thought'},
        {id: 2, name: 'body'},
        {id: 4, name: 'isItFamiliar'},
        {id: 5, name: 'decision'},
        {id: 6, name: 'conclusion'},
        {id: 7, name: 'want'},
        {id: 8, name: 'care'},
        {id: 9, name: 'question'},
        {id: 10, name: 'answer'},
        {id: 11, name: 'step'},
    ],
    template: [
        'context',
        'feelings',
        'body',
        'thought',
        'isItFamiliar',
        'decision',
        'conclusion',
        'want',
        'care',
        'question',
        'answer',
        'step',
    ],
    diaryObj: {},
}

const setActive = (state, action) => {
    return updateObject(state, {
        active: action.active
    })
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

const clearDiaryObjToEdit = (state, action) => {
    return {
        ...state,
        diaryObj: {}
    }
}

//сделать saveNoteInStateStart ..Success ..Fail
//иначе некрасиво очистка стейта с saveNoteInState(null, null)
//либо получение поста для чтения сделать из сервера - сделала
const saveNoteInState = (state, action) => {
    let value = null
    if (action.value) {
        value = action.value
    }
    return {
        ...state,
        diaryObj: {
            ...state.diaryObj,
            [action.title]: value,
        }
    }
}

const noteInit = (state, action) => {
    const date = new Date();
    console.log('date', date)
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const formatDate = (num) => {
        let res;
        if (num.toString().length < 2) {
            res = '0' + num
        } else {
            res = num
        }
        return res
    }

    let fullDate = day + '.' + formatDate(month) + '.' + year + ' ' + formatDate(hour) + ':' + formatDate(minutes);
    let millsec = Date.parse(date);
    return updateObject(state, {
        title: action.title,
        diaryObj: {},
        fullDate: null,
        millsec: null,
    })
}

const saveDiaryStart = (state, action) => {
    return updateObject(state, {
            loading: true,
        }
    )
}

const saveDiaryFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const saveDiarySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        diaryId: action.diaryId,
    })
}

const fetchPostsStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const fetchPostsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const fetchPostsSuccess = (state, action) => {
    const fetchedPostsRes = []
    for (let key in action.fetchedPosts) {
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

const removePostStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

//по сути ненужный акшн, так как при монтировании страницы постов,
//они подтягиваются с сервера
const removePostSuccess = (state, action) => {
    const updatedPosts = [];
    const posts = [...state.fetchedPostsRes]

    for (let key in posts) {
        if (posts[key].id !== action.postId) {
            updatedPosts.push(posts[key])
        }
    }
    return {
        ...state,
        fetchedPostsRes: updatedPosts,
        loading: false,
    }
}

const removePostFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE:
            return setActive(state, action);
        case actionTypes.SET_TITLE:
            return setTitle(state, action);
        case actionTypes.SET_VALUE:
            return setValue(state, action);
        case actionTypes.SAVE_NOTE_IN_STATE:
            return saveNoteInState(state, action);
        case actionTypes.NOTE_INIT:
            return noteInit(state, action);
        case actionTypes.SAVE_DIARY_START:
            return saveDiaryStart(state, action);
        case actionTypes.SAVE_DIARY_FAIL:
            return saveDiaryFail(state, action);
        case actionTypes.SAVE_DIARY_SUCCESS:
            return saveDiarySuccess(state, action);
        case actionTypes.FETCH_POSTS_START:
            return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_FAIL:
            return fetchPostsFail(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS:
            return fetchPostsSuccess(state, action);
        case actionTypes.REMOVE_POST_SUCCESS:
            return removePostSuccess(state, action);
        case actionTypes.REMOVE_POST_START:
            return removePostStart(state, action);
        case actionTypes.REMOVE_POST_FAIL:
            return removePostFail(state, action);
        case actionTypes.CLEAR_DIARY_OBJ_TO_EDIT:
            return clearDiaryObjToEdit(state, action);
        default:
            return state
    }
}


export default reducer;