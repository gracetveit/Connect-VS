import { User } from '.prisma/client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch } from 'redux';

// Constants
const SET_ME = 'SET_ME';
// Actions
const setMe = (user: User) => {
  return {
    type: SET_ME,
    user,
  };
};

export const me = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = Cookies.get('token');
      if (token) {
        const { data } = await axios.get('/auth/me', {
          headers: { authorization: token },
        });
        dispatch(setMe(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const authenticate = (
  username: string,
  password: string,
  method: 'login' | 'signup'
) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(`/auth/${method}`, {
        username,
        password,
      });
      Cookies.set('token', data.token);
      dispatch(me() as any);
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post('/auth/logout', undefined, {
        headers: { authorization: Cookies.get('token') },
      });
      Cookies.remove('token');
      dispatch(setMe({} as any));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state: any = {}, action: any) => {
  switch (action.type) {
    case SET_ME:
      return { ...action.user };
    default:
      return state;
  }
};
