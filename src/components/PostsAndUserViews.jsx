import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PostOverview from "./PostOverview"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchPostComments, fetchPostCommentsRequest} from "../actions/postsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: '12px',
    backgroundColor: '#006a71',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '4px',
    color: '#ffffdd'
  },
  commentsCont: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  comment: {
    margin: '10px 0',
    alignSelf: 'flex-start',
  },
  commentText: {
    fontWeight: '500',
    fontSize: '16px',
    textTransform: 'uppercase',
  },
  dialogTitle: {
    color: '#ffffdd',
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: '0 15px',
  },
  button: {
    color: '#006a71',
    border: '1px solid #006a71',
    fontWeight: '600',
  },
  horzLine: {
    backgroundColor: '#ccc',
    marginTop: '15px',
  },
  details: {
    margin: '5px 0',
    fontSize: '16px'
  },
  detailsHead: {
    fontWeight: 500
  }
}));

const DialogTitle = (props) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.dialogTitle}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const PostView = props => {
  const classes = useStyles();
  return (
    <>
      <PostOverview post={props.post} users={props.users} viewOnly={true} />
      <section className={classes.commentsCont}>
        {props.post.comments ? 
        <>
          <span className={classes.commentText}>Comments</span>
          {props.post.comments.map(comment => {
            return (
              <div key={comment.id} className={classes.comment}>
                <div className={classes.details}><span className={classes.detailsHead}>Subject </span>{comment.name}</div>
                <div className={classes.details}>{comment.body}</div>
                <div className={classes.details}><span className={classes.detailsHead}>Email </span>{comment.email}</div>
                <hr className={classes.horzLine}/>
              </div>
            )
          })}
        </> : <div><CircularProgress /></div>}
      </section>
    </>
  )
}

const UserView = props => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.details}><span className={classes.detailsHead}>Name: </span>{props.user.name}</div>
      <div className={classes.details}><span className={classes.detailsHead}>Username:</span> {props.user.username}</div>
      <div className={classes.details}><span className={classes.detailsHead}>Email: </span> {props.user.email}</div>
      <div className={classes.details}><span className={classes.detailsHead}>Website: </span>{props.user.website}</div>
      <div className={classes.details}><span className={classes.detailsHead}>Company Details: </span> {props.user.company.name}</div>
    </>
    )
}

const PostsAndUserViews = props => {
  const classes = useStyles();

  useEffect(() => {
    if(props.open && props.selectedView === 'post') {
      props.fetchPostComments(props.id)
    }
  }, [props.open]);

  return (
    <>
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open} fullScreen>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.selectedView === 'post' ? 'Post Details' : 'User Details'}
        </DialogTitle>
        <DialogContent dividers>
          {props.selectedView === 'post' ? <PostView post={props.posts.posts[props.id]} users={props.users.users}/> : 
            <UserView user={props.users.users[props.id]}/>}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} className={classes.button} variant="outlined">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
    fetchPostComments: (id) => dispatch(fetchPostComments(id)),
    fetchPostCommentsRequest: () => dispatch(fetchPostCommentsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsAndUserViews);
