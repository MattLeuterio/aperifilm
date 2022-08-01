import { SET_LANGUAGE, SET_TRANSLATE, SET_USER_DATA_FROM_LOGIN, SET_USER_LIST_PRODUCTS, USERS_ERROR } from "../types";

const initialState = {
  translate: "",
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
    case SET_TRANSLATE:
      return {
        ...state,
        translate: action.payload,
        loading: false,
      }
    case SET_USER_DATA_FROM_LOGIN:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case SET_USER_LIST_PRODUCTS:
      console.log('action', action.payload.favorite)
      let list = [];
      Object.entries(action.payload).reduce((acc, [key, value]) => {
        console.log('key', key);
        console.log('value', value);

        const 
        
        list = [
          ...list,
          `${key}: ${value}`
        ]
      }, [])
      console.log('list', list)
      return {
        ...state,
        list_products: action.payload,
        favorite: action.payload.favorite,
        voted: action.payload.voted,
        towatch: action.payload.towatch,
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
