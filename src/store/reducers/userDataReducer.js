/* eslint-disable import/no-anonymous-default-export */
import { SET_LANGUAGE, SET_USER_DATA_FROM_LOGIN, SET_USER_LIST_PRODUCTS, USERS_ERROR } from "../types";

const initialState = {
  language: "",
  loading: true,
  list_products: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        loading: false,
      };
    case SET_USER_DATA_FROM_LOGIN:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case SET_USER_LIST_PRODUCTS:
      const lists = action.payload;
      return {
        ...state,
        list_products: {
          favorite: lists.favorite,
          vote:lists.vote,
          watch: lists.watch,
          experience: lists.experience,
        },
        loading: false,
      };
    case USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
