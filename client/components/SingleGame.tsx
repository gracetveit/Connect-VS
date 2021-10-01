import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchGame } from '../store/singleGame';

export default (props: any) => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.singleGame);

  useEffect(() => {
    console.log(props);
    dispatch(fetchGame(props.match.params.gameName));
  }, [dispatch]);

  return (
    <div>
      <h1>{game.name}</h1>
      <p>Total Players: ???</p>
      <p>Online Players: ???</p>
      <p>Personal Score: ???</p>
      <p>Percentile: ???</p>
    </div>
  );
};
