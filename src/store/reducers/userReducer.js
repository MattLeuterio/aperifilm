import { GET_USERS_LIST } from "../types";

const initialState = {
  list: null,
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
