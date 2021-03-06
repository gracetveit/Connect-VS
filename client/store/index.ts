import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import auth from './auth';
import allGames from './allGames';
import singleGame from './singleGame';
import allRankings from './allRankings';
import currentRanking from './currentRanking';
import { User, Game, Ranking } from '.prisma/client';

const reducer = combineReducers({
  auth,
  allGames,
  singleGame,
  allRankings,
  currentRanking,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export type RootState = {
  auth: User;
  allGames: Game[];
  singleGame: Game;
  allRankings: Ranking[];
  currentRanking: Ranking;
};
