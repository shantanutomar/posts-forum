import { FETCH_POSTS_REQUEST,FETCH_POST_COMMENTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, FETCH_POST_COMMENTS_FAILURE, 
  FETCH_POST_COMMENTS_SUCCESS } from "../actionConstants/postsActionConstants";

const initialState = {
  posts: {},
  isPostsFetching: false,
  isPostsSuccess: false,
  isPostsFailure: false,
  isPostCommentsFetching: false,
  isPostCommentsSuccess: false,
  isPostCommentsFailure: false,
}

const postsReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, isPostsFetching: true, isPostsSuccess: false, isPostsFailure: false }
    
    case FETCH_POSTS_SUCCESS:
      return { posts: { ...state.posts, ...action.posts }, isPostsFetching: false, isPostsSuccess: true, isPostsFailure: false }
    
    case FETCH_POSTS_FAILURE:
      return { posts: {}, isPostsFetching: false, isPostsSuccess: false, isPostsFailure: true }

    case FETCH_POST_COMMENTS_REQUEST:
      return { ...state, isPostCommentsFetching: true, isPostCommentsSuccess: false, isPostCommentsFailure: false }
  
    case FETCH_POST_COMMENTS_SUCCESS:
      return { posts: { ...state.posts, [action.comments[0].postId]: {...state.posts[action.comments[0].postId], comments: action.comments }}, 
      isPostCommentsFetching: false, isPostCommentsSuccess: true, isPostCommentsFailure: false }

    case FETCH_POST_COMMENTS_FAILURE:
        return { posts: {}, isPostCommentsFetching: false, isPostCommentsSuccess: false, isPostCommentsFailure: true }
  
    default:
      return state
  }
}

export default postsReducer;