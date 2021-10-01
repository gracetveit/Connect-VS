import React from 'react';
import { Link } from 'react-router-dom';

export default (props: any) => {
  return (
    <Link to={`/games/${props.gameTitle}`}>
      <div>
        <h2>{props.gameTitle}</h2>
        {props.score ? <p>Score: {props.score}</p> : <React.Fragment />}
      </div>
    </Link>
  );
};
