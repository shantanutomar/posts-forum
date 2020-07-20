import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  userSearchCont: {
    width: '90%',
    margin: '10px auto',
    zIndex: '1',
  },
  autoCompleteRoot: {
    width: '100%',
    margin: 'auto',
    backgroundColor: '#fff',
  }
}));

const UserSearch = props => {
  const classes = useStyles();

  return (
    <section className={classes.userSearchCont}>
      {!props.users.isUsersFetching ? 
        <Autocomplete
        value={props.value || null}
        options={Object.values(props.users.users).map(user => user.username)}
        className={classes.autoCompleteRoot}
        onChange={(event, newValue) => props.onSearchInputChange(newValue)}
        renderInput={(params) => <TextField {...params} label="Search Users" variant="outlined" />}
      /> : null}
    </section>
  );
}
const mapStateToProps = state => {
  return {
    users: state.usersReducer
  }
}

export default connect(mapStateToProps, null)(UserSearch);