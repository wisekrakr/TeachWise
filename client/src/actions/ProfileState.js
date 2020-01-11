import axios from "axios";
import { setAlert } from "./AlertState";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_FOLLOW,
  UPDATE_FOLLOWING,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  profile,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", profile, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (profile, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", profile, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

// Add Follow
export const addFollow = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/follow/${id}`);

    dispatch({
      type: UPDATE_FOLLOW,
      payload: { id, followers: res.data }
    });
    dispatch(setAlert("Following", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// Remove Follow
export const removeFollow = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/unfollow/${id}`);

    dispatch({
      type: UPDATE_FOLLOW,
      payload: { id, followers: res.data }
    });
    dispatch(setAlert("Unfollow", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// Add Following
export const addFollowing = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/following/${id}`);

    dispatch({
      type: UPDATE_FOLLOWING,
      payload: { id, following: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// Get Following from user
export const getFollowing = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/following/${userId}`);

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// Remove Following
export const removeFollowing = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/unfollowing/${id}`);

    dispatch({
      type: UPDATE_FOLLOWING,
      payload: { id, following: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// Delete account & profile
export const deleteAccount = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete everything and can NOT be undone!"
    )
  ) {
    try {
      await axios.delete(`/api/profile/${id}`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.msg, status: err.response.status }
      });
    }
  }
};
