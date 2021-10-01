import { Ranking } from '.prisma/client';
import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import axios from 'axios';

// Constants
const SET_RANKING = 'SET_RANKING';

// Actions
const setRanking = (ranking: Ranking) => {
  return {
    type: SET_RANKING,
    ranking,
  };
};

export const fetchRanking = (gameId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = Cookies.get('token');
      if (token) {
        const { data } = await axios.get(`/api/rankings/me/${gameId}`, {
          headers: { authorization: token },
        });
        dispatch(setRanking(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state: Ranking | {} = {}, action: any) => {
  switch (action.type) {
    case SET_RANKING:
      return action.ranking;
    default:
      return state;
  }
};
