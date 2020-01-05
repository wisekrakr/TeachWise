import {
  GET_FOLLOWERS,
  FOLLOWER_ERROR,
  DELETE_FOLLOWER,
  ADD_FOLLOWER
} from "../actions/types";

const initialState = {
  followers: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload
      };
    case ADD_FOLLOWER:
      return {
        ...state,
        followers: [action.payload, ...state.followers]
      };
    case DELETE_FOLLOWER:
      return {
        ...state,
        followers: state.followers.filter(
          follower => follower._id !== action.payload
        )
      };
    case FOLLOWER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
