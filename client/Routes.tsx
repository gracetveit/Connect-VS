import { User } from '.prisma/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import Home from './components/Home';
import SingleGame from './components/SingleGame';
import UserForm from './components/UserForm';
import { RootState } from './store';
import { me } from './store/auth';

export default () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Home name={username} />} />
        <Route exact path="/login" render={() => <UserForm method="login" />} />
        <Route
          exact
          path="/signup"
          render={() => <UserForm method="signup" />}
        />
        <Route exact path="/games/:gameName" component={SingleGame} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
