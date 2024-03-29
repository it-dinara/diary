import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectPath: "/",
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    loading: false,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const reAuthSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
  });
};

const reAuthFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const setRedirectPath = (state, action) => {
  return updateObject(state, {
    redirectPath: action.path,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.RE_AUTH_SUCCESS:
      return reAuthSuccess(state, action);
    case actionTypes.RE_AUTH_FAIL:
      return reAuthFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.SET_REDIRECT_PATH:
      return setRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
