import {
  GET_FIELDS,
  GET_FIELD,
  FIELD_ERROR,
  ADD_FIELD,
  LOADING_FIELDS
} from "../actions/fieldTypes";

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
    case FIELD_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case LOADING_FIELDS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
