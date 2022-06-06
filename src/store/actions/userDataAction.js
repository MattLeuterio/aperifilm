import { SET_LANGUAGE } from '../types'
import axios from 'axios'

export const setUserLanguage = (lang) => async dispatch => {
  try{
      dispatch( {
          type: SET_LANGUAGE,
          payload: lang
      })
  }
  catch(error){
      dispatch( {
          type: USERS_ERROR,
          payload: error,
      })
  }
};