import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import auth from './auth';
import allGames from './allGames';
import singleGame from './singleGame';
import { User, Game } from '.prisma/client';

const reducer = combineReducers({ auth, allGames, singleGame });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export type RootState = {
  auth: User;
  allGames: Game[];
  singleGame: Game;
};
