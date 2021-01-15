import axiosInstance from '../../axios-diary.js';
import * as actionTypes from './actionTypes';
import axios from 'axios';


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

export const saveDiary = (diaryData, token) => {
    return dispatch => {
        dispatch(saveDiaryStart());
        axiosInstance.post('/journal.json?auth=' + token, diaryData)
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

export const fetchPosts = (token, userId) => {
    return dispatch => {
        dispatch(fetchPostsStart());

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axiosInstance.get('/journal.json' + queryParams)
        .then(res => {
        // console.log('res', res)
            console.log('res.data', res.data)
            dispatch(fetchPostsSuccess(res.data))
        })
        .catch(error => {
            dispatch(fetchPostsFail(error))
        })
    }
}

export const removePostStart = () => {
    return {
        type: actionTypes.REMOVE_POST_START,
    }
}

export const removePostSuccess = (postId) => {
    return {
        type: actionTypes.REMOVE_POST_SUCCESS,
        postId
    }
}

export const removePostFail = (error) => {
    return {
        type: actionTypes.REMOVE_POST_FAIL,
        error
    }
}

export const removePost = (token, postId) => {
    return dispatch => {
        dispatch(removePostStart())
        const queryParams = '?auth=' + token;
        axios.delete('https://diary-a95bf.firebaseio.com/journal/' + postId + '.json' + queryParams)
        .then(res => {
            console.log('REDUX postId', postId)
            dispatch(removePostSuccess(postId))
        })
        .catch(error => {
            dispatch(removePostFail(error))
        })
    }
}