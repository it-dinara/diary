import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const checkAuthTimeout = (expirationTime) => {
	console.log('checkAuthTimeout', expirationTime)
	return dispatch => {
		setTimeout(() => {
			return dispatch(logout())
		}
		, expirationTime)
	}
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHwkentplNqp5vvQlz_uVpf4nVZxciYqk';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHwkentplNqp5vvQlz_uVpf4nVZxciYqk';
        }
        axios.post(url, authData)
            .then(response => {
                console.log('response', response);
                console.log('userId', response.data.localId);
				console.log('response.data.expiresIn', response.data.expiresIn);
				
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 5000); 
				console.log('expirationDate auth', expirationDate)
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.localId);

				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn * 5000));
            })
            .catch(err => {
                console.log('err', err.response);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if(!token) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId');
				console.log( 'expirationDate authCheckState', expirationDate.getTime() - new Date().getTime() )
				
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
			} else {
				dispatch(logout());
			}
		}
	}
}