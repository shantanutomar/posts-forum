import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import PostOverview from "./components/PostOverview";
import Posts from "./components/Posts";
import UserSearch from "./components/UserSearch";

const mockStore = configureStore([]);

describe('React-Redux Component', () => {
  let store;
  let PostOverviewRef; 
  let PostsRef;
  let UserSearchRef;
 
  beforeEach(() => {
    store = mockStore({
      postsReducer: {
        posts: {1: {body: 'Test posts body', id: 1, title: 'Test posts title', userId: 1}},
        isPostsFetching: false,
        isPostsSuccess: false,
        isPostsFailure: false,
        isPostCommentsFetching: false,
        isPostCommentsSuccess: false,
        isPostCommentsFailure: false,  
      },
      usersReducer: {
        users: {1: {email: "Sincere@april.biz", id: 1, name: "Leanne Graham", phone: "1-770-736-8031 x56442", 
        username: "Bret", website: "hildegard.org", company: {name: "Romaguera-Crona"}}},
        isUsersFetching: false,
        isUsersSuccess: false,
        isUsersFailure: false    
      }
    });

    PostOverviewRef = renderer.create(
      <Provider store={store}>
        <PostOverview post={store.getState().postsReducer.posts[1]} users={store.getState().usersReducer.users}/>
      </Provider>
    );
    PostsRef = renderer.create(
      <Provider store={store}>
        <Posts />
      </Provider>
    );
    UserSearchRef = renderer.create(
      <Provider store={store}>
        <UserSearch />
      </Provider>
    );
  });
 
  it('PostOverview should render with given state from Redux store', () => {
    expect(PostOverviewRef.toJSON()).toMatchSnapshot();
  });

  it('Posts should render with given state from Redux store', () => {
    expect(PostsRef.toJSON()).toMatchSnapshot();
  });

  it('UserSearch should render with given state from Redux store', () => {
    expect(UserSearchRef.toJSON()).toMatchSnapshot();
  });
});