import axios from "axios";
import {
  GET_LOGS,
  GET_LOG_ENTRY,
  ADD_LOG_ENTRY,
  DELETE_LOG_ENTRY,
  ADD_LOG_COUNT,
  DELETE_LOG_COUNT,
  LOG_ERROR,
  LOADING_LOGS
} from "./types";
import { setAlert } from "./AlertState";

// Get Logs
export const getLogs = () => async dispatch => {
  setLogsLoading();
  try {
    const res = await axios.get(`/api/logs`);

    dispatch({
      type: GET_LOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: err.response.msg
    });
  }
};

// Get Log
export const getLogEntry = id => async dispatch => {
  try {
    const res = await axios.get(`/api/logs/${id}`);

    dispatch({
      type: GET_LOG_ENTRY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Add Log Entry
export const addLogEntry = entry => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/logs", entry, config);

    dispatch({
      type: ADD_LOG_ENTRY,
      payload: res.data
    });
    dispatch(setAlert("Entry has been logged", "success"));
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Delete Log Entry
export const deleteLogEntry = id => async dispatch => {
  try {
    await axios.delete(`/api/logs/${id}`);

    dispatch({
      type: DELETE_LOG_ENTRY,
      payload: id
    });
    dispatch(setAlert("Log Entry Removed", "success"));
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Add user log
export const addUserLog = (userId, log) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/logs/user/${userId}/${log.name}`,
      log,
      config
    );

    dispatch({
      type: ADD_LOG_COUNT,
      payload: res.data
    });
    dispatch(setAlert("Log Added to User", "success"));
  } catch (err) {
    dispatch({
      type: LOG_ERROR
    });
  }
};

// Delete user log
export const deleteUserLog = (userId, logId) => async dispatch => {
  try {
    dispatch({
      type: DELETE_LOG_COUNT,
      payload: logId
    });
    await axios.delete(`/api/logs/user/${userId}/${logId}`);
  } catch (err) {
    dispatch({
      type: LOG_ERROR
    });
  }
};

// Set Log Entries Loading
export const setLogsLoading = async () => dispatch => {
  dispatch({ type: LOADING_LOGS });
};
