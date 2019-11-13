import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  CLEAR_ITEMS,
  LOADING_ITEMS
} from "../actions/itemTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: null,
        filtered: null,
        error: null
      };

    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.items.filter(item => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return item.name.match(regex) || item.field_of_study.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case LOADING_ITEMS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
