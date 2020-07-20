import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Posts from "./components/Posts"

const useStyles = makeStyles(() => ({
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '25px 0',
    backgroundColor: '#006a71',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: '500',
    textTransform: 'uppercase',
    zIndex: '1',
    color: '#ffffdd'
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
			<header className={classes.header}>Posts</header>
			<Posts/>
    </>
  );
}

export default App;
