import {
  GET_FOLLOWERS,
  FOLLOWER_ERROR,
  DELETE_FOLLOWER,
  ADD_FOLLOWER,
  DELETE_FOLLOWING,
  ADD_FOLLOWING,
  LOADING_FOLLOWERS
} from "../actions/types";

const initialState = {
  followers: [],
  following: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
        loading: false
      };
    case ADD_FOLLOWER:
      return {
        ...state,
        followers: [action.payload, ...state.followers],
        loading: false
      };
    case DELETE_FOLLOWER:
      return {
        ...state,
        followers: state.followers.filter(
          follower => follower._id !== action.payload
        ),
        loading: false
      };
    case ADD_FOLLOWING:
      return {
        ...state,
        following: [action.payload, ...state.following],
        loading: false
      };
    case DELETE_FOLLOWING:
      return {
        ...state,
        following: state.following.filter(
          follower => follower._id !== action.payload
        ),
        loading: false
      };
    case FOLLOWER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case LOADING_FOLLOWERS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
