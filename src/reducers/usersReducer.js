import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST } from "../actionConstants/usersActionsConstants";

const initialState = {
  users: {},
  isUsersFetching: false,
  isUsersSuccess: false,
  isUsersFailure: false
}

const usersReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, isUsersFetching: true, isUsersSuccess: false, isUsersFailure: false }

    case FETCH_USERS_SUCCESS:
      return { users: { ...action.users }, isUsersFetching: false, isUsersSuccess: true, isUsersFailure: false }
    
    case FETCH_USERS_FAILURE:
      return { users: {}, isUsersFetching: false, isUsersSuccess: false, isUsersFailure: true }

    default:
      return state
  }
}

export default usersReducer;