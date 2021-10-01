import { Ranking } from '.prisma/client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch } from 'redux';
// Constants
const SET_RANKINGS = 'SET_RANKINGS';

// Actions
const setRankings = (rankings: Ranking[]) => {
  return {
    type: SET_RANKINGS,
    rankings,
  };
};

export const fetchAllMyRankings = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = Cookies.get('token');
      if (token) {
        const { data } = await axios.get('/api/rankings/me', {
          headers: { authorization: token },
        });
        dispatch(setRankings(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state: Ranking[] = [], action: any) => {
  switch (action.type) {
    case SET_RANKINGS:
      return action.rankings;
    default:
      return state;
  }
};
