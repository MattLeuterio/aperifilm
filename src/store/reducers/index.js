import { combineReducers } from 'redux';
import appReducer from './appReducer';
import productReducer from './productReducer';
import userDataReducer from './userDataReducer';

export default combineReducers({
  app: appReducer,
  userData: userDataReducer,
  product: productReducer
})