import { SET_LANGUAGE, SET_LANGUAGE_ERROR, SET_USER_DATA_FROM_LOGIN, SET_USER_DATA_FROM_LOGIN_ERROR, SET_USER_LIST_PRODUCTS, SET_USER_LIST_PRODUCTS_ERROR } from "../types";

export const setUserLanguage = (lang) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LANGUAGE,
      payload: lang,
    });
  } catch (error) {
    dispatch({
      type: SET_LANGUAGE_ERROR,
      payload: error,
    });
  }
};

export const setUserDataFromLogin = (data) => async (dispatch) => {
  try {
    const editedData = {
      ...data,
      list_products: JSON.parse(data.list_products)
    }
    dispatch({
      type: SET_USER_DATA_FROM_LOGIN,
      payload: editedData,
    });
  } catch (error) {
    dispatch({
      type: SET_USER_DATA_FROM_LOGIN_ERROR,
      payload: error,
    });
  }
};

export const setUserProducts = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_USER_LIST_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_USER_LIST_PRODUCTS_ERROR,
      payload: error,
    });
  }
};
