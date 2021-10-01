import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { logout, me } from '../store/auth';

export default () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.id);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  const handleLogout = (event: any) => {
    dispatch(logout());
  };

  return (
    <div id="navbar">
      <Link to="/">Home</Link>
      <div id="user-info">
        {isLoggedIn ? (
          <a onClick={handleLogout}>Logout</a>
        ) : (
          <React.Fragment>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
