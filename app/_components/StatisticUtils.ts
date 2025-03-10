import { IMatchData, IResult } from "../interfaces";

export function collectWins(matchData: IMatchData[]): Record<string, number> {
  const wins: Record<string, number> = {};

  matchData.forEach((match) => {
    wins[match.player1.name] = wins[match.player1.name] || 0;
    wins[match.player2.name] = wins[match.player2.name] || 0;
    if (match.player1.score > match.player2.score) {
      wins[match.player1.name] = (wins[match.player1.name] || 0) + 1;
    } else {
      wins[match.player2.name] = (wins[match.player2.name] || 0) + 1;
    }
  });

  return wins;
}

export function calculateScore(
  matchData: IMatchData[]
): Record<string, number> {
  const SCORE_BASE = 1200;
  const ADD = 16;

  const scores: Record<string, number> = {};

  matchData.forEach((match) => {
    const p1 = scores[match.player1.name] || SCORE_BASE;
    const p2 = scores[match.player2.name] || SCORE_BASE;

    const E1 = 1 / (1 + 10 ** ((p2 - p1) / 400));
    const E2 = 1 / (1 + 10 ** ((p1 - p2) / 400));

    const S1 = match.player1.score > match.player2.score ? 1 : 0;
    const S2 = match.player1.score < match.player2.score ? 1 : 0;

    const newP1 = p1 + ADD * (S1 - E1);
    const newP2 = p2 + ADD * (S2 - E2);

    scores[match.player1.name] = newP1;
    scores[match.player2.name] = newP2;
    match.player1.points = newP1;
    match.player2.points = newP2;
  });

  return scores;
}

export function findHighestElo(matchData: Record<string, number>): IResult {
  const results = Object.entries(matchData).reduce(
    (acc, [key, value]) => {
      return value > acc[1] ? [key, value] : acc;
    },
    ["", 0]
  );

  return { name: [results[0]], num: +results[1].toFixed(0) };
}

export function findLowestElo(matchData: Record<string, number>): IResult {
  const results = Object.entries(matchData).reduce(
    (acc, [key, value]) => {
      return value < acc[1] ? [key, value] : acc;
    },
    ["", 10000]
  );

  return { name: [results[0]], num: +results[1].toFixed(0) };
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

export function findMostWins(matchData: IMatchData[]): IResult {
  if (matchData.length === 0) {
    return { name: ["-"], num: 0 };
  }

  const wins = collectWins(matchData);

  const results: string[][] = [];
  Object.entries(wins).forEach(([name, value]) => {
    if (results[value]) results[value].push(name);
    else results[value] = [name];
  });

  const names = results[results.length - 1];
  const score = results.length - 1;

  return { name: names, num: score };
}

export function findMostLosses(matchData: IMatchData[]): IResult {
  if (matchData.length === 0) {
    return { name: ["-"], num: 0 };
  }

  const losses = collectLosses(matchData);

  const results: string[][] = [];
  Object.entries(losses).forEach(([name, value]) => {
    if (results[value]) results[value].push(name);
    else results[value] = [name];
  });

  const names = results[results.length - 1];
  const score = results.length - 1;

  return { name: names, num: score };
}

export function collectWinLoseRatio(
  matchData: IMatchData[]
): Record<string, number> {
  const wins = collectWins(matchData);
  const losses = collectLosses(matchData);

  const ratio: Record<string, number> = {};

  Object.keys(wins).forEach((player) => {
    ratio[player] = wins[player] / (losses[player] || 1);
  });

  return ratio;
}

export function getAllPlayers(matchData: IMatchData[]): string[] {
  const players = new Set<string>();

  matchData.forEach((match) => {
    players.add(match.player1.name);
    players.add(match.player2.name);
  });

  return Array.from(players);
}

export function findLongestWinStreak(matchData: IMatchData[]): IResult {
  if (matchData.length === 0) {
    return { name: ["-"], num: 0 };
  }

  const players = getAllPlayers(matchData);
  let playerWithLongest = "";
  let streak = 0;
  players.forEach((player) => {
    const result = findLongestWinStreakByPlayer(matchData, player);
    if (result.num > streak) {
      streak = result.num;
      playerWithLongest = player;
    }
  });

  return { name: [playerWithLongest], num: streak };
}

export function findLongestWinStreakByPlayer(
  matchData: IMatchData[],
  player: string
): IResult {
  if (matchData.length === 0) {
    return { name: ["-"], num: 0 };
  }

  const streaks: number[] = [];

  const filteredMatchData = matchData
    .filter(
      (match) => match.player1.name === player || match.player2.name === player
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  filteredMatchData.forEach((match) => {
    if (
      match.player1.name === player &&
      match.player1.score > match.player2.score
    ) {
      streak++;
    } else if (
      match.player2.name === player &&
      match.player2.score > match.player1.score
    ) {
      streak++;
    } else {
      if (streak > 0) streaks.push(streak);
      streak = 0;
    }
  });

  if (streak > 0) streaks.push(streak);

  return { name: [player], num: Math.max(...streaks) };
}

export function findBestWinLoseRatio(matchData: IMatchData[]): IResult {
  if (matchData.length === 0) {
    return { name: ["-"], num: 0 };
  }

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

  return { name: [bestPlayer], num: +bestRatio.toFixed(2) };
}

export function findWorstWinLoseRatio(matchData: IMatchData[]): IResult {
  if (matchData.length === 0) {
    return { name: ["-"], num: 0 };
  }

  const wins = collectWins(matchData);
  const losses = collectLosses(matchData);

  let worstRatio = 100;
  let worstPlayer = "";
  Object.keys(wins).forEach((player) => {
    const ratio = wins[player] / (losses[player] || 1);
    if (ratio < worstRatio && ratio !== 0) {
      worstRatio = ratio;
      worstPlayer = player;
    }
  });

  return { name: [worstPlayer], num: +worstRatio.toFixed(2) };
}
