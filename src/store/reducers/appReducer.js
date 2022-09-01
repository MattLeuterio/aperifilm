import { SET_FULLSCREEN_PANEL } from "../types";

const initialState = {
  fullScreenPanel: {
    isOpen: false,
    selected: 0
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FULLSCREEN_PANEL:
      return {
        ...state,
        fullScreenPanel: action.payload,
      };

    default:
      return state;
  }
}
