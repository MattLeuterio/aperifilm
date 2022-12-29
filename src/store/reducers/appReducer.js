import { SET_FULLSCREEN_PANEL, SET_VOTE_PANEL } from "../types";

const initialState = {
  fullScreenPanel: {
    isOpen: false,
    selected: 0,
    list: []
  },
  votePanel: {
    isOpen: false,
    selected: {}
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FULLSCREEN_PANEL:
      return {
        ...state,
        fullScreenPanel: action.payload,
      };

    case SET_VOTE_PANEL:
      return {
        ...state,
        votePanel: action.payload,
      };

    default:
      return state;
  }
}
