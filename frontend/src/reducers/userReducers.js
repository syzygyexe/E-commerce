import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      // Once its done loading, done making the request, user will be filled with that action object.
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      // Once its done loading, done making the request, user will be filled with that action object.
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      // ...state = { user: {} }
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      // Once its done loading, done making the request, user will be filled with that action object.
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      // Reset user when logout.
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      // Once its done loading, done making the request, userInfo will be filled with that action object.
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case USER_LIST_SUCCESS:
      // Once its done loading, done making the request, users will be filled with that action object.
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      // User list should be only visible for the admin. Therefore, we are reseting all personal information,
      // the entire user list info when is admin logging-out.
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};
