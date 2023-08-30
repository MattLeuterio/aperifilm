import { SET_FULLSCREEN_PANEL, SET_MODAL_DELETE, SET_MODAL_EXPERIENCE, SET_MODAL_SHARE, SET_MODAL_VOTE } from "../types";

const initialState = {
  fullScreenPanel: {
    isOpen: false,
    selected: 0,
    list: []
  },
  modalVote: {
    isOpen: false,
    selected: {}
  },
  modalExperience: {
    isOpen: false,
    selected: {}
  },
  modalDelete: {
    isOpen: false,
    selected: {}
  },
  modalShare: {
    isOpen: false,
    selected: {}
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FULLSCREEN_PANEL:
      return {
        ...state,
        fullScreenPanel: action.payload,
      };

    case SET_MODAL_VOTE:
      return {
        ...state,
        modalVote: action.payload,
      };

    case SET_MODAL_EXPERIENCE:
      return {
        ...state,
        modalExperience: action.payload,
      };

    case SET_MODAL_DELETE:
      return {
        ...state,
        modalDelete: action.payload,
      };

    case SET_MODAL_SHARE:
      return {
        ...state,
        modalShare: action.payload,
      };

    default:
      return state;
  }
}
