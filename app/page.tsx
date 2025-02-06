import BaseSection from "./_components/BaseSection";
import MatchCard from "./_components/MatchCard";
import StatisticSection from "./_components/StatisticSection";
import { RefineMockUpData } from "./_components/StatisticUtils";

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
