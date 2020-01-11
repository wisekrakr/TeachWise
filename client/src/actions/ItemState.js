import axios from "axios";
import {
  GET_ITEMS,
  GET_ITEMS_USER,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_LIKE,
  ITEM_ERROR,
  LOADING_ITEMS,
  GET_ITEMS_BY_FIELD,
  GET_ITEMS_BY_NAME,
  GET_ITEMS_CLASSMATES
} from "./types";

import { setAlert } from "./AlertState";

// Get Items
export const getItems = () => async dispatch => {
  setItemsLoading();
  try {
    const res = await axios.get("/api/items/all");

    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
    });
  }
};

// Get Items from people you follow
export const getItemsFromClassmates = userId => async dispatch => {
  setItemsLoading();
  try {
    const res = await axios.get(`/api/items/profile/${userId}`);
    dispatch({
      type: GET_ITEMS_CLASSMATES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
    });
  }
};

// Get Items By Field name
export const getItemsByField = fieldId => async dispatch => {
  setItemsLoading();
  try {
    const res = await axios.get(`/api/items/field/${fieldId}`);

    dispatch({
      type: GET_ITEMS_BY_FIELD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
    });
  }
};

// Get Items by name
export const getItemsByName = itemName => async dispatch => {
  setItemsLoading();
  try {
    const res = await axios.get(`/api/items/name/${itemName}`);

    dispatch({
      type: GET_ITEMS_BY_NAME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
    });
  }
};

// // Get Items
export const getItemsFromUser = userId => async dispatch => {
  setItemsLoading();
  try {
    const res = await axios.get(`/api/items/user/${userId}`);

    dispatch({
      type: GET_ITEMS_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
    });
  }
};

// Get Item
export const getItem = id => async dispatch => {
  setItemsLoading();
  try {
    const res = await axios.get(`/api/items/${id}`);

    dispatch({
      type: GET_ITEM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
    });
  }
};

// Add Item
export const addItem = (item, history, edit = false) => async dispatch => {
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

    if (!edit) {
      history.push(`/api/items/${item._id}`);
      dispatch(setAlert("Study Item Created", "success"));
    } else {
      dispatch(setAlert("Study Item Edited", "success"));
    }
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
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

    dispatch(setAlert("Item Removed", "success"));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
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
    dispatch(setAlert("Comment Posted", "success"));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
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

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR
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
      type: ITEM_ERROR
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
      type: ITEM_ERROR
    });
  }
};

// Set Items Loading
export const setItemsLoading = async () => dispatch => {
  dispatch({ type: LOADING_ITEMS });
};
