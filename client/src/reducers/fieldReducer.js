import {
  GET_FIELDS,
  GET_FIELD,
  FIELD_ERROR,
  ADD_FIELD,
  DELETE_FIELD,
  LOADING_FIELDS
} from "../actions/types";

const initialState = {
  fields: [],
  field: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FIELDS:
      return {
        ...state,
        fields: action.payload,
        loading: false
      };
    case GET_FIELD:
      return {
        ...state,
        field: action.payload,
        loading: false
      };
    case ADD_FIELD:
      return {
        ...state,
        fields: [action.payload, ...state.fields],
        loading: false
      };
    case DELETE_FIELD:
      return {
        ...state,
        fields: state.fields.filter(field => field._id !== action.payload),
        loading: false
      };
    case FIELD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case LOADING_FIELDS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
