import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, FETCH_POST_COMMENTS_SUCCESS, 
  FETCH_POST_COMMENTS_REQUEST, FETCH_POST_COMMENTS_FAILURE } from "../actionConstants/postsActionConstants";
import { fetchUsersSuccess } from "./userActions";
import { arrayToObjectKeyByID } from "../utils/utils";

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com';
const LIMIT = 20;

export const fetchPosts = start => {
  return (dispatch) => {
    fetch(`${API_ENDPOINT}/posts?_start=${start}&_limit=${LIMIT}`)
    .then(res => res.json())
    .then(data => {
      const posts = arrayToObjectKeyByID(data, "id");
      dispatch(fetchPostsSuccess(posts));
    })
    .catch(error => {
      console.error(error);
      dispatch(fetchPostsFailure());
    })
  }
}

export const fetchPostComments = id => {
  return (dispatch) => {
    fetch(`${API_ENDPOINT}/posts/${id}/comments`)
    .then(res => res.json())
    .then(data => {
      dispatch(fetchPostCommentsSuccess(data));
    })
    .catch(error => {
      console.error(error);
      dispatch(fetchPostCommentsFailure());
    })
  }
}

export const fetchInitialPostsAndUsers = () => {
  return (dispatch) => {
    const fetchPosts = fetch(`${API_ENDPOINT}/posts?_start=0&_limit=${LIMIT}`);
    const fetchUsers = fetch(`${API_ENDPOINT}/users`);

    Promise.all([fetchPosts, fetchUsers]).then(res => 
      Promise.all(res.map(res => res.json()))).then(data => {
        const posts = arrayToObjectKeyByID(data[0], "id");
        const users = arrayToObjectKeyByID(data[1], "id");

        dispatch(fetchPostsSuccess(posts));
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchPostsFailure());
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchPostsFailure());
      })
  }
}

export const fetchPostCommentsRequest = () => {
  return {
    type: FETCH_POST_COMMENTS_REQUEST
  }
}

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST
  }
}

const fetchPostsSuccess = posts => {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts
  }
}

const fetchPostCommentsSuccess = comments => {
  return {
    type: FETCH_POST_COMMENTS_SUCCESS,
    comments
  }
}

const fetchPostCommentsFailure = () => {
  return {
    type: FETCH_POST_COMMENTS_FAILURE,
  }
}

const fetchPostsFailure = () => {
  return {
    type: FETCH_POSTS_FAILURE,
  }
}