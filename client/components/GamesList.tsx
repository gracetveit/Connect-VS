import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchGames } from '../store/allGames';
import GamesListItem from './GamesListItem';

export default () => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.allGames);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {games.map((game) => (
          <GamesListItem key={game.id} gameTitle={game.name} />
        ))}
      </ul>
    </div>
  );
};
