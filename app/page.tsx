import BaseSection from "./_components/BaseSection";
import MatchCard from "./_components/MatchCard";
import StatisticSection from "./_components/StatisticSection";
import { RefineMockUpData } from "./_components/StatisticUtils";

export default function Home() {
  const data = RefineMockUpData();

  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);

  const lastDayOfMonth = new Date();
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);

  const currentMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date());

  return (
    <>
      <div className="flex text-5xl font-bold text-gray-100 p-4 bg-gray-800">
        BackSnapper
      </div>
      <div className="min-h-screen flex flex-col justify-center p-2 gap-4 sm:p-6 text-gray-800 font-[family-name:var(--font-geist-sans)]">
        <div className="flex gap-6">
          <div className="flex flex-col gap-6 flex-1">
            <StatisticSection
              from={firstDayOfMonth}
              to={lastDayOfMonth}
              infoLabel={currentMonthName}
            />
            <StatisticSection infoLabel="All" />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <BaseSection label="Match History">
              {data.reverse().map((match, index) => (
                <MatchCard key={index} match={match} />
              ))}
            </BaseSection>
          </div>
        </div>
      </div>
    </>
  );
}
