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
        diary,
    }
}

export const setDate = () => {
    return {
        type: actionTypes.SET_DATE,
    }
}

export const saveDiary = (diaryData, token) => {
    return dispatch => {
        dispatch(saveDiaryStart());
        axios.post('/journal.json?auth=' + token, diaryData)
            .then(response => {
                console.log('response save', response)
                dispatch(saveDiarySuccess(response.data.name, diaryData))
            })
            .catch(error => {
                dispatch(saveDiaryFail(error))
            })
    }
}

export const fetchPostsSuccess = (fetchedPosts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        fetchedPosts
    }
}

export const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error
    }
}

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START
    }
}

// export const fetchPosts = (token, userId) => {
//     return dispatch => {
//         dispatch(fetchPostsStart());

//         axios.get('/diary.json')
//         .then(res => {
//         console.log('res.data', res.data)
//         console.log('res', res)
//             dispatch(fetchPostsSuccess(res.data))
//         })
//         .catch(error => {
//             dispatch(fetchPostsFail(error))
//         })
//     }
// }

export const fetchPosts = (token, userId) => {
    return dispatch => {
        dispatch(fetchPostsStart());

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/journal.json' + queryParams)
        .then(res => {
        console.log('res.data', res.data)
        console.log('res', res)
        // console.log('url','/journal.json' + queryParams )
            dispatch(fetchPostsSuccess(res.data))
        })
        .catch(error => {
            dispatch(fetchPostsFail(error))
        })
    }
}