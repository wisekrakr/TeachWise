import {
  GET_LOGS,
  ADD_LOG_ENTRY,
  DELETE_LOG_ENTRY,
  LOADING_LOGS,
  LOG_ERROR
} from "../actions/logTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG_ENTRY:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        loading: false
      };
    case DELETE_LOG_ENTRY:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload),
        loading: false
      };

    case LOG_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case LOADING_LOGS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
