import { SET_FULLSCREEN_PANEL, SET_FULLSCREEN_PANEL_ERROR, USERS_ERROR } from "../types";

export const setFullscreenPanel = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_FULLSCREEN_PANEL,
      payload: {
        isOpen: data.isOpen,
        selected: data.selected
      },
    });
  } catch (error) {
    dispatch({
      type: SET_FULLSCREEN_PANEL_ERROR,
      payload: error,
    });
  }
};