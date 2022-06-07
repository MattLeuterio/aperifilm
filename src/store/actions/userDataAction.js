import { SET_LANGUAGE, SET_USER_DATA_FROM_LOGIN } from "../types";

export const setUserLanguage = (lang) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LANGUAGE,
      payload: lang,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const setUserDataFromLogin = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_USER_DATA_FROM_LOGIN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};
