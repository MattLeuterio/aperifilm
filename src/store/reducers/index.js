import { combineReducers } from 'redux'
import userDataReducer from './userDataReducer'
import userReducer from './usersReducer'

export default combineReducers({
  usersList: userReducer,
  userData: userDataReducer
})