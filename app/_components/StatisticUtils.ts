import mockup from "../../data/mockup.json";
import {
  IFormsPayload,
  IFormsPayloadAnswers,
  IMatchData,
  IResult,
} from "../interfaces";

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
      comment: answers[4].answer1,
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

// export function collectMostMatches(matchData: IMatchData[]): IResult {
//   const players = matchData.reduce((acc, match) => {
//     acc[match.player1.name] = (acc[match.player1.name] || 0) + 1;
//     acc[match.player2.name] = (acc[match.player2.name] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const data = Object.entries(players).reduce(
//     (acc, [key, value]) => {
//       return value > acc[1] ? [key, value] : acc;
//     },
//     ["", 0]
//   );

//   return { name: data[0], num: data[1] };
// }

export function findMostWins(matchData: IMatchData[]): IResult {
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

export function findBestWinLoseRatio(matchData: IMatchData[]): IResult {
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

  return { name: [worstPlayer], num: +worstRatio.toFixed(2) };
}
