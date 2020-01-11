import axios from "axios";
import { setAlert } from "./AlertState";

import {
  GET_FOLLOWERS,
  FOLLOWER_ERROR,
  DELETE_FOLLOWER,
  DELETE_FOLLOWING,
  ADD_FOLLOWER,
  ADD_FOLLOWING,
  LOADING_FOLLOWERS
} from "./types";

// Add Follow
export const addFollow = (userId, id) => async dispatch => {
  try {
    const res = await axios.post(`/api/followers/${userId}/followers/${id}`);

    dispatch({
      type: ADD_FOLLOWER,
      payload: res.data
    });
    dispatch(setAlert("Following", "success"));
  } catch (err) {
    dispatch({
      type: FOLLOWER_ERROR
    });
  }
};

// Remove Follow
export const removeFollow = (userId, id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/followers/${userId}/followers/${id}`);

    dispatch({
      type: DELETE_FOLLOWER,
      payload: res.data
    });
    dispatch(setAlert("Unfollow", "success"));
  } catch (err) {
    dispatch({
      type: FOLLOWER_ERROR
    });
  }
};

// Add Following
export const addFollowing = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/following/${id}`);

    dispatch({
      type: ADD_FOLLOWING,
      payload: { id, following: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// Get followers from user
export const getFollowers = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/followers/${userId}`);

    dispatch({
      type: GET_FOLLOWERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FOLLOWER_ERROR
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

// Set followers Loading
export const setFollowersLoading = async () => dispatch => {
  dispatch({ type: LOADING_FOLLOWERS });
};
