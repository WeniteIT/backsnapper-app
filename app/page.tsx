import MatchSection from "./_components/MatchSection";
import StatisticSection from "./_components/StatisticSection";
import { RefineMockUpData } from "./_components/StatisticUtils";

export default async function Home() {
  const data = RefineMockUpData();

  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);

  const lastDayOfMonth = new Date();
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);

  const currentMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date());

  return (
    <div className="secondary-text flex flex-col justify-center p-2 gap-4 sm:p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-6 flex-col-reverse 2xl:flex-row">
        <div className="flex flex-col gap-6 flex-1">
          <StatisticSection
            from={firstDayOfMonth}
            to={lastDayOfMonth}
            infoLabel={currentMonthName}
          />
          <StatisticSection infoLabel="All" />
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <MatchSection matchData={data} />
        </div>
      </div>
    </div>
  );
}
