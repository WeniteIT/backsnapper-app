import { IMatchData } from "../interfaces";
import { RefineMockUpData } from "../page";

export function collectWins(matchData: IMatchData[]): Record<string, number> {
  const wins: Record<string, number> = {};

  matchData.forEach((match) => {
    if (match.player1.score > match.player2.score) {
      wins[match.player1.name] = (wins[match.player1.name] || 0) + 1;
    } else {
      wins[match.player2.name] = (wins[match.player2.name] || 0) + 1;
    }
  });

  return wins;
}

export function collectLosses(matchData: IMatchData[]): Record<string, number> {
  const losses: Record<string, number> = {};

  matchData.forEach((match) => {
    if (match.player1.score < match.player2.score) {
      losses[match.player1.name] = (losses[match.player1.name] || 0) + 1;
    } else {
      losses[match.player2.name] = (losses[match.player2.name] || 0) + 1;
    }
  });

  return losses;
}

export function collectMostMatches() {
  const matchData = RefineMockUpData();
  const players = matchData.reduce((acc, match) => {
    acc[match.player1.name] = (acc[match.player1.name] || 0) + 1;
    acc[match.player2.name] = (acc[match.player2.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(players).reduce(
    (acc, [key, value]) => {
      return value > acc[1] ? [key, value] : acc;
    },
    ["", 0]
  );

  return data[0] + " / " + data[1];
}

export function findMostWins() {
  const matchData = RefineMockUpData();
  const wins = collectWins(matchData);

  const result = Object.entries(wins).reduce(
    (acc, [key, value]) => {
      return value > acc[1] ? [key, value] : acc;
    },
    ["", 0]
  );

  return result[0] + " / " + result[1];
}

export function findMostLosses() {
  const matchData = RefineMockUpData();
  const losses = collectLosses(matchData);

  const result = Object.entries(losses).reduce(
    (acc, [key, value]) => {
      return value > acc[1] ? [key, value] : acc;
    },
    ["", 0]
  );

  return result[0] + " / " + result[1];
}

export function findBestWinLoseRatio() {
  const matchData = RefineMockUpData();
  const wins = collectWins(matchData);
  const losses = collectLosses(matchData);

  let bestRatio = 0;
  let bestPlayer = "";
  Object.keys(wins).forEach((player) => {
    const ratio = wins[player] / (losses[player] || 1);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestPlayer = player;
    }
  });

  return bestPlayer + " / " + bestRatio.toFixed(2);
}

export function findWorstWinLoseRatio() {
  const matchData = RefineMockUpData();
  const wins = collectWins(matchData);
  const losses = collectLosses(matchData);

  let worstRatio = 100;
  let worstPlayer = "";
  Object.keys(wins).forEach((player) => {
    const ratio = wins[player] / (losses[player] || 1);
    if (ratio < worstRatio) {
      worstRatio = ratio;
      worstPlayer = player;
    }
  });

  return worstPlayer + " / " + worstRatio.toFixed(2);
}
