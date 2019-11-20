import axios from "axios";
import {
  GET_FIELDS,
  GET_FIELD,
  ADD_FIELD,
  LOADING_FIELDS,
  FIELD_ERROR
} from "./fieldTypes";

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
      payload: err.response.msg
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
      payload: err.response.msg
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
      payload: err.response.msg
    });
  }
};

// Set Log Entries Loading
export const setFieldsLoading = async () => dispatch => {
  dispatch({ type: LOADING_FIELDS });
};
