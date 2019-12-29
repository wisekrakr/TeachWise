import axios from "axios";
import {
  GET_SKILLS,
  GET_SKILL,
  ADD_SKILL,
  DELETE_SKILL,
  LOADING_SKILLS,
  SKILL_ERROR
} from "./types";
import { setAlert } from "./AlertState";

// Get skills
export const getSkills = () => async dispatch => {
  setSkillsLoading();
  try {
    const res = await axios.get(`/api/skills`);

    dispatch({
      type: GET_SKILLS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SKILL_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Get skill
export const getSkill = id => async dispatch => {
  try {
    const res = await axios.get(`/api/skills/${id}`);

    dispatch({
      type: GET_SKILL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SKILL_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Add Skill to profile
export const addSkill = skill => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/skills", skill, config);

    dispatch({
      type: ADD_SKILL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SKILL_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Delete  skill
export const deleteSkill = id => async dispatch => {
  try {
    await axios.delete(`/api/skills/${id}`);

    dispatch({
      type: DELETE_SKILL,
      payload: id
    });
    dispatch(setAlert("Skill Removed", "success"));
  } catch (err) {
    dispatch({
      type: SKILL_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Set skills to loading
export const setSkillsLoading = async () => dispatch => {
  dispatch({ type: LOADING_SKILLS });
};
