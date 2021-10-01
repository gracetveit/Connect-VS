import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchRanking } from '../store/currentRanking';
import { fetchGame } from '../store/singleGame';

export default (props: any) => {
  const dispatch = useDispatch();
  const game: any = useSelector((state: RootState) => state.singleGame);
  const userInfo = useSelector((state: RootState) => state.currentRanking);

  useEffect(() => {
    dispatch(fetchGame(props.match.params.gameName));
  }, [dispatch]);

  useEffect(() => {
    if (game.id) {
      dispatch(fetchRanking(game.id));
    }
  }, [game]);

  return (
    <div>
      <h1>{game.name}</h1>
      {game.rankings ? (
        <React.Fragment>
          <p>Total Players: {game.rankings.length}</p>
          <p>
            Online Players:{' '}
            {
              game.rankings.filter(
                (ranking: any) => ranking.user.status === 'ONLINE'
              ).length
            }
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
      {userInfo.score ? (
        <p>Personal Score: {userInfo.score}</p>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};
