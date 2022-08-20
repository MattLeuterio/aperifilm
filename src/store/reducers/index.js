import { combineReducers } from 'redux';
import productReducer from './productReducer';
import userDataReducer from './userDataReducer';
import userReducer from './userReducer';

export default combineReducers({
  userData: userDataReducer,
  usersList: userReducer,
  product: productReducer
})