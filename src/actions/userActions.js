import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "../actionConstants/usersActionsConstants";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    users
  }
}
