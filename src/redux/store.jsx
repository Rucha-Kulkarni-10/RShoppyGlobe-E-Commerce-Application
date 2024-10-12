
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import searchReducer from './reducers/searchSlice';
import authReducer from './reducers/authSlice'; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    auth: authReducer, 
  },
});

export default store;