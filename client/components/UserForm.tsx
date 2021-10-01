import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { authenticate } from '../store/auth';

export default (props: any) => {
  let history = useHistory();
  const [user, setUser] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(authenticate(user.username, user.password, props.method));
    history.push('/');
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const newUserInfo = { [event.target.name]: event.target.value };
    setUser({ ...user, ...newUserInfo });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">User Name</label>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        id="username"
      />

      <label htmlFor="Password">Password</label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        id="password"
      />

      <button type="submit">
        {props.method === 'login' ? 'Log In' : 'Sign Up'}
      </button>
    </form>
  );
};
