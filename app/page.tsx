import React from "react";
import mockup from "../data/mockup.json";

interface IMatchData {
  id: string;
  date: string;
  player1: {
    name: string;
    score: string;
  };
  player2: {
    name: string;
    score: string;
  };
}

interface IFormsPayload {
  value: {
    id: number;
    submitDate: string;
    answers: string;
  }[];
}

interface IFormsPayloadAnswers {
  answer1: string;
}

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
        score: answers[2].answer1,
      },
      player2: {
        name: answers[1].answer1,
        score: answers[3].answer1,
      },
    };
    matchData.push(match);
  });

  return matchData;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {RefineMockUpData()
        .reverse()
        .map((match, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md"
          >
            <h3 className="text-lg font-bold">
              {new Date(match.date).toLocaleString()}
            </h3>
            <div className="flex gap-4 text-3xl">
              {`${match.player1.name} ${match.player1.score} / ${match.player2.score} ${match.player2.name}`}
            </div>
          </div>
        ))}
    </div>
  );
}
