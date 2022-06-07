import { SET_LANGUAGE, SET_USER_DATA_FROM_LOGIN, USERS_ERROR } from "../types";

const initialState = {
  language: "",
  loading: true,
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
    case USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
