import { combineReducers } from 'redux'
import userDataReducer from './userDataReducer'
import userReducer from './userReducer'

export default combineReducers({
  userData: userDataReducer,
  usersList: userReducer
})