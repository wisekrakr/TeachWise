import axios from "axios";
import {
  GET_FIELDS,
  GET_FIELD,
  ADD_FIELD,
  DELETE_FIELD,
  ADD_FIELD_COUNT,
  DELETE_FIELD_COUNT,
  LOADING_FIELDS,
  FIELD_ERROR
} from "./types";
import { setAlert } from "./AlertState";

// Get fields of study
export const getFields = () => async dispatch => {
  setFieldsLoading();
  try {
    const res = await axios.get(`/api/fields`);

    dispatch({
      type: GET_FIELDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIELD_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Get field of study
export const getField = id => async dispatch => {
  try {
    const res = await axios.get(`/api/fields/${id}`);

    dispatch({
      type: GET_FIELD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIELD_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Add Field of study
export const addField = field => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/fields", field, config);

    dispatch({
      type: ADD_FIELD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIELD_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Delete study field
export const deleteField = id => async dispatch => {
  try {
    await axios.delete(`/api/fields/${id}`);

    dispatch({
      type: DELETE_FIELD,
      payload: id
    });
    dispatch(setAlert("Field of Study Removed", "success"));
  } catch (err) {
    dispatch({
      type: FIELD_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Add user field
export const addUserField = (userId, field) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/fields/user/${userId}/${field.name}`,
      field,
      config
    );

    dispatch({
      type: ADD_FIELD_COUNT,
      payload: res.data
    });
    dispatch(setAlert("Field Added to User", "success"));
  } catch (err) {
    dispatch({
      type: FIELD_ERROR
    });
  }
};

// Delete user field
export const deleteUserField = (userId, fieldId) => async dispatch => {
  try {
    dispatch({
      type: DELETE_FIELD_COUNT,
      payload: fieldId
    });
    await axios.delete(`/api/fields/user/${userId}/${fieldId}`);
  } catch (err) {
    dispatch({
      type: FIELD_ERROR
    });
  }
};

// Set Log Entries Loading h
export const setFieldsLoading = async () => dispatch => {
  dispatch({ type: LOADING_FIELDS });
};
