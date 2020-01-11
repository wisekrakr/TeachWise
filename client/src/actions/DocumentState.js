import axios from "axios";
import {
  GET_DOC,
  GET_CHAPTER,
  GET_DOCS,
  GET_DOCUMENTS_BY_CHAPTER,
  GET_CHAPTERS_BY_ITEM,
  ADD_DOC,
  DELETE_DOC,
  ADD_CHAPTER,
  DELETE_CHAPTER,
  DOC_ERROR,
  CHAPTER_ERROR,
  GET_CHAPTERS,
  LOADING_DOCS,
  LOADING_CHAPTERS
} from "./types";

import { setAlert } from "./AlertState";

// Get Docs
export const getDocs = () => async dispatch => {
  setDocsLoading();
  try {
    const res = await axios.get("/api/documents");

    dispatch({
      type: GET_DOCS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DOC_ERROR
    });
  }
};

// // Get Items
export const getDocumentsByChapter = chapterId => async dispatch => {
  try {
    const res = await axios.get(`/api/documents/${chapterId}/documents`);

    dispatch({
      type: GET_DOCUMENTS_BY_CHAPTER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DOC_ERROR
    });
  }
};

// Get Chapter
export const getChapters = () => async dispatch => {
  setChaptersLoading();
  try {
    const res = await axios.get("/api/chapters");

    dispatch({
      type: GET_CHAPTERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAPTER_ERROR
    });
  }
};

// // Get Items
export const getChaptersByItem = itemId => async dispatch => {
  try {
    const res = await axios.get(`/api/chapters/${itemId}/chapters`);

    dispatch({
      type: GET_CHAPTERS_BY_ITEM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAPTER_ERROR
    });
  }
};

// Get Item
export const getDoc = id => async dispatch => {
  try {
    const res = await axios.get(`/api/documents/${id}`);

    dispatch({
      type: GET_DOC,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DOC_ERROR
    });
  }
};

// Get Chapter
export const getChapter = id => async dispatch => {
  try {
    const res = await axios.get(`/api/chapters/${id}`);

    dispatch({
      type: GET_CHAPTER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAPTER_ERROR
    });
  }
};

// Add Document
export const addDocument = (
  doc,
  itemId,
  history,
  edit = false
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`/api/documents/${itemId}`, doc, config);

    dispatch({
      type: ADD_DOC,
      payload: res.data
    });

    if (!edit) {
      history.push(`/api/items/${itemId}`);
      dispatch(setAlert("Document Created", "success"));
    } else {
      dispatch(setAlert("Document Edited", "success"));
    }
  } catch (err) {
    dispatch({
      type: DOC_ERROR
    });
  }
};

// Add Chapter
export const addChapter = (chapter, itemId) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`/api/chapters/${itemId}`, chapter, config);

    dispatch({
      type: ADD_CHAPTER,
      payload: res.data
    });
    dispatch(setAlert("Chapter Created", "success"));
  } catch (err) {
    dispatch({
      type: CHAPTER_ERROR
    });
  }
};

// Delete Document
export const deleteDoc = id => async dispatch => {
  try {
    await axios.delete(`/api/documents/${id}`);

    dispatch({
      type: DELETE_DOC,
      payload: id
    });

    dispatch(setAlert("Document Removed", "success"));
  } catch (err) {
    dispatch({
      type: DOC_ERROR
    });
  }
};

// Delete Chapter
export const deleteChapter = id => async dispatch => {
  try {
    await axios.delete(`/api/chapters/${id}`);

    dispatch({
      type: DELETE_CHAPTER,
      payload: id
    });

    dispatch(setAlert("Chapter Removed", "success"));
  } catch (err) {
    dispatch({
      type: CHAPTER_ERROR
    });
  }
};

// Set Documents Loading
export const setDocsLoading = async () => dispatch => {
  dispatch({ type: LOADING_DOCS });
};
// Set Chapters Loading
export const setChaptersLoading = async () => dispatch => {
  dispatch({ type: LOADING_CHAPTERS });
};
