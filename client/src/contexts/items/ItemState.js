import React, { useReducer } from "react";
import axios from "axios";
import Context from "./itemContext";
import itemReducer from "../../reducers/itemReducer";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  LOADING_ITEMS
} from "../../actions/itemTypes";

const ItemState = props => {
  const initialState = {
    items: [],
    filtered: null,
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

  // Update Item
  const updateItem = async item => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config);

      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Items
  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS });
  };

  // Filter Items
  const filterItems = text => {
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Set Items Loading
  const setItemsLoading = () => {
    dispatch({ type: LOADING_ITEMS });
  };

  return (
    <Context.Provider
      value={{
        items: state.items,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addItem,
        deleteItem,
        updateItem,
        filterItems,
        clearFilter,
        getItems,
        clearItems,
        setItemsLoading
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ItemState;
