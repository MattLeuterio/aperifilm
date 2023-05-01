/* eslint-disable import/no-anonymous-default-export */
import { SET_LANGUAGE, SET_USER_DATA_FROM_LOGIN, SET_USER_LIST_PRODUCTS, USERS_ERROR } from "../types";

const initialState = {
  language: "",
  loading: true,
  list_products: []
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
      const allUniqueProducts = [];
      lists.favorite.map(el => {
        if (!allUniqueProducts?.includes(el?.id)) allUniqueProducts.push(el.id);
      })
      lists.watch.map(el => {
        if (!allUniqueProducts?.includes(el?.id)) allUniqueProducts.push(el.id);
      })
      lists.vote.map(el => {
        if (!allUniqueProducts?.includes(el?.id)) allUniqueProducts.push(el.id);
      })
      return {
        ...state,
        list_products: [
          {
            total_products: allUniqueProducts.length,
            lists: {
              favorite: action.payload.favorite,
              vote: action.payload.vote,
              watch: action.payload.watch,
            }
          }
        ],
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
