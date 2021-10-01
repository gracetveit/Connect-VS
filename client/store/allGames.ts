import { Game } from '.prisma/client';
import axios from 'axios';
import { Dispatch } from 'redux';
// Constants
const SET_GAMES = 'SET_GAMES';
// Actions
const setGames = (games: Game[]) => {
  return {
    type: SET_GAMES,
    games,
  };
};

export const fetchGames = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(`/api/games`);
    dispatch(setGames(data));
  } catch (error) {
    console.log(error);
  }
};
// Reducer
export default (state: Game[] = [], action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
