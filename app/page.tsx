import mockup from "../data/mockup.json";
import BaseSection from "./_components/BaseSection";
import MatchCard from "./_components/MatchCard";
import StatisticSection from "./_components/StatisticSection";
import { IFormsPayload, IFormsPayloadAnswers, IMatchData } from "./interfaces";

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

export default function Home() {
  const data = RefineMockUpData();

  return (
    <>
      <div className="flex text-5xl font-bold text-gray-100 p-4 bg-gray-800">
        BackSnapper
      </div>
      <div className="min-h-screen flex flex-col justify-center p-2 gap-4 sm:p-4 text-gray-800 font-[family-name:var(--font-geist-sans)]">
        <div className="flex gap-4">
          <StatisticSection />
          <BaseSection label="Match History">
            {data.reverse().map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
          </BaseSection>
        </div>
      </div>
    </>
  );
}
