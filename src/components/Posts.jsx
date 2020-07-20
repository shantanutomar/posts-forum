import React, { useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchPostsRequest, fetchInitialPostsAndUsers, fetchPosts } from "../actions/postsActions";
import { fetchUsersRequest } from "../actions/userActions";
import PostsAndUserViews from "./PostsAndUserViews";
import UserSearch from "./UserSearch";
import PostOverview from "./PostOverview"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  postsCont: {
    padding: '0 5%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '@media (max-width: 450px)': {
      padding: '0 2%',
    }
  },
  loader: {
    textAlign: 'center',
    marginTop: '60px',
  }
}));

const Posts = props => {
  const classes = useStyles(props);
  const posts = useRef();
  const users = useRef();
  const searchValueRef = useRef();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogProps, setDialogProps] = React.useState({ selectedView: 'post', id: 0 });
  const [searchValue, setSearchValue] = React.useState(null);

  useEffect(() => {
    const handleScroll = () => {

      if((window.innerHeight + document.documentElement.scrollTop) <= document.documentElement.offsetHeight - 1) return;      

      if(Object.values(posts.current).length < 100 && !searchValueRef.current) {
        setTimeout(() => {
          props.fetchPostsRequest();
          props.fetchPosts(Object.values(posts.current).length);  
        }, 300)
      }
    }
    
    props.fetchPostsRequest();
    props.fetchUsersRequest();
    props.fetchInitialPostsAndUsers();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    posts.current = props.posts.posts;
    users.current = props.users.users;
    searchValueRef.current = searchValue;
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onSearchInputChange = searchValue => {
    searchValue ? setSearchValue(searchValue) : setSearchValue(null); 
  }

  const onBlockClick = (event, selectedView, id) => {
    event.stopPropagation();
    setOpenDialog(true);
    setDialogProps({ selectedView, id });
  }

  const filterPostsResults = () => {
    let renderPosts = null;
    if(searchValue) {
      const selectedUser = Object.values(props.users.users).filter(user => user.username === searchValue);
      renderPosts = Object.values(props.posts.posts).filter(post => post.userId === selectedUser[0].id).map(post => {
        return <PostOverview key={post.id} onBlockClick={onBlockClick} post={post} users={props.users.users} />        
      });
    } else {
      renderPosts = Object.values(props.posts.posts).map(post => {
        return <PostOverview key={post.id} onBlockClick={onBlockClick} post={post} users={props.users.users} />
      });  
    }
    return renderPosts.length > 0 ? renderPosts : 'Posts Not Available';
  }

  return (
    props.users.isUsersFetching && !props.posts.isPostsFailure ? 
    <div className={classes.loader}><CircularProgress /></div> :
    <section className={classes.main}>
      <UserSearch onSearchInputChange={onSearchInputChange} value={searchValue} />
      <section className={classes.postsCont}>
        {!props.posts.isPostsFailure ? filterPostsResults() : 'Something went wrong'}
      </section>
      {props.posts.isPostsFetching ? <div>Loading More Posts...</div> : null}
      <PostsAndUserViews open={openDialog} handleClose={handleClose} { ...dialogProps } />
    </section>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer,
    users: state.usersReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostsRequest: () => dispatch(fetchPostsRequest()),
    fetchPosts: (start) => dispatch(fetchPosts(start)),
    fetchUsersRequest: () => dispatch(fetchUsersRequest()),
    fetchInitialPostsAndUsers: () => dispatch(fetchInitialPostsAndUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);