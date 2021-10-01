import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchGames } from '../store/allGames';
import { fetchAllMyRankings } from '../store/allRankings';
import GamesListItem from './GamesListItem';

export default () => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.allGames);
  const rankings = useSelector((state: RootState) => state.allRankings);
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllMyRankings());
  }, [user]);

  const myRankings: { [key: number]: number } = rankings.reduce((acc, cur) => {
    return { ...acc, [cur.gameId]: cur.score };
  }, {});

  return (
    <div>
      <ul>
        {games.map((game) => {
          return (
            <GamesListItem
              key={game.id}
              gameTitle={game.name}
              score={myRankings[game.id]}
            />
          );
        })}
      </ul>
    </div>
  );
};
