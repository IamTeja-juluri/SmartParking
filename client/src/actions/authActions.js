import axios from 'axios';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// Action creators
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

// Async action creators
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/v1/user/signin',credentials);
    console.log('Authentication successful:', response.data);
    const user = response.data;
    // Dispatch the loginSuccess action with the user data
    dispatch(loginSuccess(user));
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/v1/user/signup', userData);
    const user = response.data;
    // Dispatch the registerSuccess action with the user data
    dispatch(registerSuccess(user));
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Send a POST request to your logout API, if applicable
    // You may also clear user data from local storage or state

    // Dispatch the logoutSuccess action
    dispatch(logoutSuccess());
  } catch (error) {
    // Handle logout failure, e.g., show an error message
    console.error('Logout failed:', error);
  }
};
