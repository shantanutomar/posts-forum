import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      padding: '12px',
      backgroundColor: '#006a71',
      color: '#ffffdd'
    },
    '@media (max-width: 450px)': {
      width: '100%',
      margin: 0
    }
  },
  viewOnlyPaperRoot: {
    width: '100%',
  },
  postTitle: {
    fontSize: '20px',
    fontWeight: '500',
  },
  userName: {
    cursor: 'pointer',
    marginTop: '15px',
  }
}));

const PostOverview = (props) => {
  const classes = useStyles();

  return (
    <div key={props.post.id} className={!props.viewOnly ? classes.paperRoot : 
        `${classes.paperRoot} ${classes.viewOnlyPaperRoot}`} 
      onClick={!props.viewOnly ? (event) => props.onBlockClick(event, 'post', props.post.id) : null}>
      <Paper elevation={3}>
        <div className={classes.postTitle}>{props.post.title}</div> 
        <div className={classes.userName} 
          onClick={!props.viewOnly ? (event) => props.onBlockClick(event, 'user', props.post.userId) : null}>
          Created By {props.users[props.post.userId].username}</div>
      </Paper>
    </div>
  );
}

export default PostOverview;