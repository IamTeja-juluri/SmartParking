import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
  } from '../actions/authActions';
  
  const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        // Store the token and user data upon successful login or registration
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isAuthenticated: true,
        };
      case LOGOUT_SUCCESS:
        // Clear the token and user data upon successful logout
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  