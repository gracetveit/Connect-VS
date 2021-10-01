import React from 'react';
import GamesList from './GamesList';

export default (props: any) => (
  <div>
    <h1>Hello {props.name || 'world'}</h1>
    <GamesList />
  </div>
);
