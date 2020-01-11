import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_ERROR,
  ADD_COMMENT,
  UPDATE_LIKE,
  DELETE_COMMENT,
  LOADING_ITEMS,
  GET_ITEMS_BY_NAME,
  GET_ITEMS_BY_FIELD
} from "../actions/types";

const initialState = {
  items: [],
  namedItems: [],
  fieldItems: [],
  item: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case GET_ITEMS_BY_NAME:
      return {
        ...state,
        namedItems: action.payload,
        loading: false
      };
    case GET_ITEMS_BY_FIELD:
      return {
        ...state,
        fieldItems: action.payload,
        loading: false
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        item: { ...state.item, user_comments: action.payload },
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        item: {
          ...state.item,
          user_comments: state.item.user_comments.filter(
            comment => comment._id !== action.payload
          )
        },
        loading: false
      };
    case UPDATE_LIKE:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, likes: action.payload.likes }
            : item
        ),
        loading: false
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case LOADING_ITEMS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
