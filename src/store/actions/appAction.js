import { SET_FULLSCREEN_PANEL, SET_FULLSCREEN_PANEL_ERROR, SET_VOTE_PANEL, SET_VOTE_PANEL_ERROR, USERS_ERROR } from "../types";

export const setFullscreenPanel = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_FULLSCREEN_PANEL,
      payload: {
        isOpen: data.isOpen,
        selected: data.selected,
        list: data.list
      },
    });
  } catch (error) {
    dispatch({
      type: SET_FULLSCREEN_PANEL_ERROR,
      payload: error,
    });
  }
};

export const setVotePanel = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_VOTE_PANEL,
      payload: {
        isOpen: data.isOpen,
        selected: data.selected
      },
    });
  } catch (error) {
    dispatch({
      type: SET_VOTE_PANEL_ERROR,
      payload: error,
    });
  }
};