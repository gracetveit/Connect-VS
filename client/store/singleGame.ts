import { Game } from '.prisma/client';
import axios from 'axios';
import { Dispatch } from 'redux';
// Constants
const SET_GAME = 'SET_GAME';
// Actions
const setGame = (game: Game) => {
  return {
    type: SET_GAME,
    game,
  };
};

export const fetchGame = (gameName: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(`/api/games/${gameName}`);
    dispatch(setGame(data));
  } catch (error) {
    console.log(error);
  }
};

// Reducer
export default (state: Game | {} = {}, action: any) => {
  switch (action.type) {
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
};
