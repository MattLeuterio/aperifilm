import { SET_FULLSCREEN_PANEL, USERS_ERROR } from "../types";

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
      type: USERS_ERROR,
      payload: error,
    });
  }
};