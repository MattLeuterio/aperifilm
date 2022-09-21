import {GET_USERS_LIST, GET_USERS_LIST_ERROR, USERS_ERROR} from '../types'
import axios from 'axios'

export const getUsersList = () => async dispatch => {
  try{
      const res = await axios.get('/api/get-users');
      dispatch({
          type: GET_USERS_LIST,
          payload: res.data
      })
  }
  catch(error){
      dispatch( {
          type: GET_USERS_LIST_ERROR,
          payload: error,
      })
  }
};