import { signupSuccess, signupFailure, loginSuccess, loginFailure } from '../reducers/authSlice';

// Mock user database to store registered users
let registeredUsers = [];

// Action to handle signup
export const signupUser = (userData) => (dispatch) => {
  const existingUser = registeredUsers.find(user => user.username === userData.username);

  if (existingUser) {
    dispatch(signupFailure('User already exists'));
  } else {
    registeredUsers.push(userData); 
    dispatch(signupSuccess(userData));
  }
};


export const loginUser = (userData, navigate) => (dispatch) => {
  return new Promise((resolve) => {
    const user = registeredUsers.find(
      (dbUser) => dbUser.username === userData.username && dbUser.password === userData.password
    );

    if (user) {
      // If credentials are correct, login the user
      dispatch(loginSuccess(user));
      navigate('/'); 
      resolve({ success: true }); 
    } else {
      // Invalid credentials
      dispatch(loginFailure('Invalid username or password'));
      resolve({ error: 'Invalid username or password' }); 
    }
  });
};
