import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADD_ITEM_COUNT,
  DELETE_ITEM_COUNT,
  ADD_FIELD_COUNT,
  DELETE_FIELD_COUNT,
  ADD_LOG_COUNT,
  DELETE_LOG_COUNT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    case ADD_ITEM_COUNT:
      return {
        ...state,
        items: { ...state.items, item_count: action.payload },
        loading: false
      };
    case DELETE_ITEM_COUNT:
      return {
        ...state,
        items: {
          ...state.items,
          item_count: state.user.metadata.item_count.filter(
            item => item._id !== action.payload
          )
        },
        loading: false
      };
    case ADD_FIELD_COUNT:
      return {
        ...state,
        fields: { ...state.fields, field_count: action.payload },
        loading: false
      };
    case DELETE_FIELD_COUNT:
      return {
        ...state,
        fields: {
          ...state.fields,
          field_count: state.user.metadata.field_count.filter(
            field => field._id !== action.payload
          )
        },
        loading: false
      };
    case ADD_LOG_COUNT:
      return {
        ...state,
        logs: { ...state.logs, log_count: action.payload },
        loading: false
      };
    case DELETE_LOG_COUNT:
      return {
        ...state,
        logs: {
          ...state.logs,
          log_count: state.user.metadata.log_count.filter(
            log => log._id !== action.payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
