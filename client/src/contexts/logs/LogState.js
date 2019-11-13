import React, { useReducer } from "react";
import axios from "axios";
import Context from "./logContext";
import logReducer from "../../reducers/logReducer";
import {
  GET_LOGS,
  ADD_LOG_ENTRY,
  DELETE_LOG_ENTRY,
  LOG_ERROR,
  LOADING_LOGS
} from "../../actions/logTypes";

const LogState = props => {
  const initialState = {
    logs: [],
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // Get Logs
  const getLogs = async () => {
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

  // Add Log Entry
  const addLogEntry = async entry => {
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
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Item
  const deleteLogEntry = async id => {
    try {
      await axios.delete(`/api/logs/${id}`);

      dispatch({
        type: DELETE_LOG_ENTRY,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Log Entries Loading
  const setLogsLoading = () => {
    dispatch({ type: LOADING_LOGS });
  };

  return (
    <Context.Provider
      value={{
        logs: state.logs,
        error: state.error,
        loading: state.loading,
        addLogEntry,
        deleteLogEntry,
        getLogs,
        setLogsLoading
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default LogState;
