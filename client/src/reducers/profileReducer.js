import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  UPDATE_FOLLOW,
  UPDATE_FOLLOWING,
  GET_PROFILES,
  GET_FOLLOWED_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  followed_profiles: [],
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
    case GET_FOLLOWED_PROFILES:
      return {
        ...state,
        followed_profiles: action.payload,
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
        loading: false
      };
    case UPDATE_FOLLOW:
      return {
        ...state,
        profiles: state.profiles.map(profile =>
          profile._id === action.payload.id
            ? { ...profile.connection, followers: action.payload.followers }
            : profile
        ),
        loading: false
      };
    case UPDATE_FOLLOWING:
      return {
        ...state,
        profiles: state.profiles.map(profile =>
          profile._id === action.payload.id
            ? { ...profile.connection, following: action.payload.following }
            : profile
        ),
        loading: false
      };
    default:
      return state;
  }
};
