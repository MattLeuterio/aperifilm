import { SET_FULLSCREEN_PANEL, SET_FULLSCREEN_PANEL_ERROR, SET_MODAL_DELETE, SET_MODAL_DELETE_ERROR, SET_MODAL_EXPERIENCE, SET_MODAL_EXPERIENCE_ERROR, SET_MODAL_VOTE, SET_MODAL_VOTE_ERROR } from "../types";

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

export const setModalVote = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MODAL_VOTE,
      payload: {
        isOpen: data.isOpen,
        selected: data.selected
      },
    });
  } catch (error) {
    dispatch({
      type: SET_MODAL_VOTE_ERROR,
      payload: error,
    });
  }
}
;

export const setModalExperience = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MODAL_EXPERIENCE,
      payload: {
        isOpen: data.isOpen,
        selected: data.selected
      },
    });
  } catch (error) {
    dispatch({
      type: SET_MODAL_EXPERIENCE_ERROR,
      payload: error,
    });
  }
};

export const setModalDelete = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MODAL_DELETE,
      payload: {
        isOpen: data.isOpen,
        selected: data.selected
      },
    });
  } catch (error) {
    dispatch({
      type: SET_MODAL_DELETE_ERROR,
      payload: error,
    });
  }
};