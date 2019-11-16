import React, { useReducer } from "react";
import axios from "axios";
import Context from "./itemContext";
import itemReducer from "../../reducers/itemReducer";
import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  ADD_COMMENT,
  DELETE_COMMENT,
  ITEM_ERROR,
  LOADING_ITEMS
} from "../../actions/itemTypes";

const ItemState = props => {
  const initialState = {
    items: [],
    item: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get Items
  const getItems = async () => {
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
        payload: err.response.msg
      });
    }
  };

  // Get Item
  const getItem = id => async () => {
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
  const addItem = async item => {
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
        payload: err.response.msg
      });
    }
  };

  // Delete Item
  const deleteItem = async id => {
    try {
      await axios.delete(`/api/items/${id}`);

      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add user comment
  const addUserComment = async (id, comment) => {
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
      dispatch({
        type: ITEM_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Delete user comment
  const deleteUserComment = (itemId, commentId) => async () => {
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

  // Set Items Loading
  const setItemsLoading = () => {
    dispatch({ type: LOADING_ITEMS });
  };

  return (
    <Context.Provider
      value={{
        items: state.items,
        item: state.item,
        error: state.error,
        loading: state.loading,
        addItem,
        addUserComment,
        deleteUserComment,
        deleteItem,
        getItems,
        getItem,
        setItemsLoading
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ItemState;
