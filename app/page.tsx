import React from "react";
import mockup from "../data/mockup.json";
import { IMatchData, IFormsPayload, IFormsPayloadAnswers } from "./interfaces";

function RefineMockUpData(): IMatchData[] {
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

function collectWins(matchData: IMatchData[]): Record<string, number> {
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

function collectLosses(matchData: IMatchData[]): Record<string, number> {
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

function collectMostMatches() {
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

function findBestWinLoseRatio() {
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

  return (
    bestPlayer +
    " / " +
    bestRatio.toFixed(2) +
    " Ø / (" +
    wins[bestPlayer] +
    "/" +
    (losses[bestPlayer] || 0) +
    ")"
  );
}

function findWorstWinLoseRatio() {
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

  return (
    worstPlayer +
    " / " +
    worstRatio.toFixed(2) +
    " Ø / (" +
    wins[worstPlayer] +
    "/" +
    (losses[worstPlayer] || 0) +
    ")"
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center p-2 gap-4 sm:p-10 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      <div className="flex text-5xl font-bold mb-8">BACKSNAPPER</div>
      <div className="flex gap-8">
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex text-4xl font-bold">Statistics</div>
          <div className="flex gap-3 flex-col">
            <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-gray-100 rounded-md shadow-md flex-1">
              <div className="text-lg">Total registered valid Matches</div>
              <div className="text-4xl"> {RefineMockUpData().length}</div>
            </div>
            <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-gray-100 rounded-md shadow-md flex-1">
              <div className="text-lg">Most Wins</div>
              <div className="text-4xl">
                {
                  Object.entries(collectWins(RefineMockUpData())).reduce(
                    (acc, [key, value]) => {
                      return value > acc[1] ? [key, value] : acc;
                    },
                    ["", 0]
                  )[0]
                }
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-gray-100 rounded-md shadow-md flex-1">
              <div className="text-lg">Most Losses</div>
              <div className="text-4xl">
                {
                  Object.entries(collectLosses(RefineMockUpData())).reduce(
                    (acc, [key, value]) => {
                      return value > acc[1] ? [key, value] : acc;
                    },
                    ["", 0]
                  )[0]
                }
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-gray-100 rounded-md shadow-md flex-1">
              <div className="text-lg">Best W/L Ratio</div>
              <div className="text-4xl">{findBestWinLoseRatio()}</div>
            </div>
            <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-gray-100 rounded-md shadow-md flex-1">
              <div className="text-lg">Worst W/L Ratio</div>
              <div className="text-4xl">{findWorstWinLoseRatio()}</div>
            </div>
            <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-gray-100 rounded-md shadow-md flex-1">
              <div className="text-lg">Most matches played</div>
              <div className="text-4xl">{collectMostMatches()}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex text-4xl font-bold">Match History</div>
          {RefineMockUpData()
            .reverse()
            .map((match, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-4 border border-gray-300 bg-gray-100 rounded-md shadow-md relative"
              >
                <div className="text-4xl font-bold text-gray-200 absolute top-2 right-2">
                  {match.id}
                </div>
                <div className="text-lg">
                  {new Date(match.date).toLocaleString("de-DE")}
                </div>
                <div className="flex gap-4 text-4xl items-center">
                  <span>{match.player1.name}</span>
                  <b>
                    <span
                      className={
                        match.player2.score < match.player1.score
                          ? "text-yellow-500 text-5xl"
                          : ""
                      }
                    >
                      {match.player1.score}
                    </span>

                    <span>/</span>
                    <span
                      className={
                        match.player2.score > match.player1.score
                          ? "text-yellow-500 text-5xl"
                          : ""
                      }
                    >
                      {match.player2.score}
                    </span>
                  </b>
                  <span>{match.player2.name}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
