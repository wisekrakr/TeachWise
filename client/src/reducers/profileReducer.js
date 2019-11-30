import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
};
