import axios from "axios";
import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_LIKE,
  ITEM_ERROR,
  GET_FIELD,
  LOADING_ITEMS
} from "./itemTypes";

// Get Items
export const getItems = () => async dispatch => {
  setItemsLoading();
  try {
    const res = await axios.get("/api/items");

    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Item
export const getItem = id => async dispatch => {
  try {
    const res = await axios.get(`/api/items/${id}`);

    dispatch({
      type: GET_ITEM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Item
export const addItem = item => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/items", item, config);

    dispatch({
      type: ADD_ITEM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Item
export const deleteItem = id => async dispatch => {
  try {
    await axios.delete(`/api/items/${id}`);

    dispatch({
      type: DELETE_ITEM,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add user comment
export const addUserComment = (id, comment) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/items/user_comments/${id}`,
      comment,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete user comment
export const deleteUserComment = (itemId, commentId) => async dispatch => {
  try {
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });
    await axios.delete(`/api/items/user_comments/${itemId}/${commentId}`);
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/items/like/${id}`);

    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/items/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKE,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Set Items Loading
export const setItemsLoading = async () => dispatch => {
  dispatch({ type: LOADING_ITEMS });
};
