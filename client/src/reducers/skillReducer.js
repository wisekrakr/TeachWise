import {
  GET_SKILLS,
  GET_SKILL,
  SKILL_ERROR,
  ADD_SKILL,
  DELETE_SKILL,
  LOADING_SKILL
} from "../actions/types";

const initialState = {
  skills: [],
  skill: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SKILLS:
      return {
        ...state,
        skills: action.payload,
        loading: false
      };
    case GET_SKILL:
      return {
        ...state,
        skill: action.payload,
        loading: false
      };
    case ADD_SKILL:
      return {
        ...state,
        skills: [action.payload, ...state.skills],
        loading: false
      };
    case DELETE_SKILL:
      return {
        ...state,
        skills: state.skills.filter(skill => skill._id !== action.payload),
        loading: false
      };
    case SKILL_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case LOADING_SKILLS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
