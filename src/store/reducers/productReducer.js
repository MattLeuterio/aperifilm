import { GET_PRODUCT_DETAILS } from "../types";

const initialState = {
  productDetails: null,
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
