const estimated = (Ra: number, Rb: number) => {
  return 1 / (1 + 10 ** ((Rb - Ra) / 400));
};

const updating = (Ra: number, k: number, Sa: number, Ea: number) => {
  return Ra + k * (Sa - Ea);
};

const kFactor = (games: number, score: number) => {
  if (games >= 30 && score >= 2400) {
    return 10;
  } else if (score < 2400) {
    return 20;
  } else {
    return 40;
  }
};

type Player = { score: number; gamesPlayed: number; points: number };

const match = (playerA: Player, playerB: Player) => {
  const totalGames = playerA.points + playerB.points;

  const eA = estimated(playerA.score, playerB.score);
  const eB = estimated(playerB.score, playerA.score);

  const kA = kFactor(playerA.gamesPlayed, playerA.score);
  const kB = kFactor(playerB.gamesPlayed, playerB.score);

  const sA = playerA.points / totalGames;
  const sB = playerB.points / totalGames;

  const newAScore = updating(playerA.score, kA, sA, eA);
  const newBScore = updating(playerB.score, kB, sB, eB);

  const aGames = (playerA.gamesPlayed += totalGames);
  const bGames = (playerB.gamesPlayed += totalGames);

  return [
    { score: newAScore, gamesPlayed: aGames },
    { score: newBScore, gamesPlayed: bGames },
  ];
};
