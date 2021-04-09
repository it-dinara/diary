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

export const reAuthSuccess = (token, userId) => {
	return {
		type: actionTypes.RE_AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const reAuthFail = (error) => {
	return {
		type: actionTypes.RE_AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	sessionStorage.clear()
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const checkAuthTimeout = (expirationTime) => {
	// console.log('checkAuthTimeout', expirationTime)
	return dispatch => {
		setTimeout(() => {
			return dispatch(reAuth())
		}
		, expirationTime)
	}
}

export const reAuth = () => {
	return dispatch => {
		const refreshToken = sessionStorage.getItem('refreshToken');
		const body = 'grant_type=refresh_token&refresh_token=' + refreshToken
		let url = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyCHwkentplNqp5vvQlz_uVpf4nVZxciYqk';

		axios.post(url, body)
			.then(response => {
				// console.log('----------------------- \n res ReAuth', response)
				dispatch(authSuccess(response.data.id_token, response.data.user_id));

				sessionStorage.clear()

				const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
				sessionStorage.setItem('token', response.data.id_token);
				sessionStorage.setItem('refreshToken', response.data.refresh_token);
				sessionStorage.setItem('expirationDate', expirationDate);
				sessionStorage.setItem('userId', response.data.user_id);

			})
			.catch(err => {
				// console.log('----------------------- \n err ReAuth', err)
				dispatch(authFail(err))
			})
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
				
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				// console.log('expirationDate auth', expirationDate)
				sessionStorage.setItem('token', response.data.idToken);
				sessionStorage.setItem('refreshToken', response.data.refreshToken);
				sessionStorage.setItem('expirationDate', expirationDate);
				sessionStorage.setItem('userId', response.data.localId);

				dispatch(authSuccess(response.data.idToken, response.data.localId));
				// dispatch(checkAuthTimeout(response.data.expiresIn * 1000));

            })
            .catch(err => {
                // console.log('err', err.response);
                dispatch(authFail(err.response));
            });
    };
};



export const setRedirectPath = (path) => {
	return {
		type: actionTypes.SET_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = sessionStorage.getItem('token');
		if(!token) {
			dispatch(reAuth())
		} else {
			const expirationDate = new Date(sessionStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = sessionStorage.getItem('userId');
				// console.log( 'expirationDate authCheckState', expirationDate.getTime() - new Date().getTime() )
				
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
			} else {
				dispatch(reAuth());
			}
		}
	}
}