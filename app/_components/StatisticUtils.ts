import { IFormsPayload, IFormsPayloadAnswers, IMatchData } from "../interfaces";
import mockup from "../../data/mockup.json";

export function RefineMockUpData(): IMatchData[] {
  const matchData: IMatchData[] = [];
  const formsPayload: IFormsPayload = mockup;

  formsPayload.value.forEach((item) => {
    const answers = JSON.parse(item.answers) as IFormsPayloadAnswers[];
    const match: IMatchData = {
      id: item.id.toString(),
      date: item.submitDate,
      player1: {
        name: answers[0].answer1,
        score: +answers[2].answer1,
      },
      player2: {
        name: answers[1].answer1,
        score: +answers[3].answer1,
      },
    };
    matchData.push(match);
  });

  return matchData
    .filter((e) => e.player1.score !== 0 || e.player2.score !== 0)
    .filter((e) => e.player1.name !== "" && e.player2.name !== "")
    .filter((e) => e.player1.score !== e.player2.score)
    .filter((e) => e.player1.name !== e.player2.name);
}

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
