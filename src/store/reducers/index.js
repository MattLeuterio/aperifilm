import { combineReducers } from 'redux';
import appReducer from './appReducer';
import productReducer from './productReducer';
import userDataReducer from './userDataReducer';
import userReducer from './userReducer';

export default combineReducers({
  app: appReducer,
  userData: userDataReducer,
  usersList: userReducer,
  product: productReducer
})