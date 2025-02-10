import MatchSection from "./_components/MatchSection";
import StatisticSection from "./_components/StatisticSection";
import { RefineMockUpData, collectScores } from "./_components/StatisticUtils";

export default async function Home() {
  const data = RefineMockUpData();

  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);

  const lastDayOfMonth = new Date();
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);

  const currentMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date());

  const currentYear = new Date().getFullYear();

  const DateOfFirstGame = new Date(data[0].date);

  return (
    <div className="secondary-text flex flex-col justify-center p-2 gap-4 sm:p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-2 md:gap-6 flex-col-reverse 2xl:flex-row">
        <div className="flex flex-col gap-2 md:gap-6 flex-1">
          <StatisticSection
            from={firstDayOfMonth}
            to={lastDayOfMonth}
            leftLabel="Current Month"
            rightLabel={currentMonthName + " " + currentYear}
          />
          <StatisticSection
            leftLabel="All entries"
            rightLabel={"since " + DateOfFirstGame.toLocaleDateString("de-DE")}
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-6 flex-1">
          <MatchSection matchData={data} />
        </div>
      </div>
    </div>
  );
}
