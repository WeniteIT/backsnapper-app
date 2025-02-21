import { BlobServiceClient } from "@azure/storage-blob";
import {
  IFormsPayload,
  IFormsPayloadAnswers,
  IMatchData,
  IResult,
} from "../interfaces";

export async function getMatchData(): Promise<IMatchData[]> {
  const matchData: IMatchData[] = [];

  const connectionString = `DefaultEndpointsProtocol=https;AccountName=backsnapperblobb;AccountKey=Od3lZ5NmWuPZjLhhT9EEhoAVZT7zrlf9eUdnfUmkl0iBfIfRCAgDINcxvjDGMRJZijiO7pxgmsY/+AStV3FNew==;EndpointSuffix=core.windows.net`;
  const containerName = "results";

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blockBlobClient = containerClient.getBlockBlobClient("matchData.json");

  const content = await blockBlobClient.downloadToBuffer();
  const formsPayload: IFormsPayload = JSON.parse(content.toString());

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

  const blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    if (blob.name !== "matchData.json") {
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      const content = await blockBlobClient.downloadToBuffer();
      const matchResult: IMatchData = JSON.parse(content.toString());
      matchData.push({
        ...matchResult,
        player1: {
          name: matchResult.player1.name,
          score: +matchResult.player1.score,
        },
        player2: {
          name: matchResult.player2.name,
          score: +matchResult.player2.score,
        },
      });
    }
  }

  return matchData
    .filter((e) => e.player1.name !== "Ole" && e.player2.name !== "Ole")
    .filter((e) => e.comment?.toUpperCase() !== "DEBUG")
    .filter((e) => e.player1.score !== 0 || e.player2.score !== 0)
    .filter((e) => e.player1.name !== "" && e.player2.name !== "")
    .filter((e) => e.player1.score !== e.player2.score)
    .filter((e) => e.player1.name !== e.player2.name);
}

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

export function calculateElo(matchData: IMatchData[]): Record<string, number> {
  const SCORE_BASE = 1200;
  const ADD = 20;

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
    if (ratio < worstRatio && ratio !== 0) {
      worstRatio = ratio;
      worstPlayer = player;
    }
  });

  return { name: [worstPlayer], num: +worstRatio.toFixed(2) };
}
