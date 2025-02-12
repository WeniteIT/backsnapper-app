import { unstable_cache } from "next/cache";
import { IoPieChartSharp } from "react-icons/io5";
import MatchSection from "./_components/MatchSection";
import StatisticSection from "./_components/StatisticSection";
import { getMatchData } from "./_components/StatisticUtils";

export default async function Home() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

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
    <div
      className="secondary-text container-background flex justify-center font-[family-name:var(--font-geist-sans)] h-full bg-cover bg-center bg-no-repeat"
    >
      <div
        className="flex gap-2 md:gap-4 flex-col-reverse p-2 sm:p-4 sm:px-10 2xl:flex-row w-550 h-full"
        style={{
          backgroundColor: "rgba(0,0,0, 0.04)",
        }}
      >
        <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full">
          <StatisticSection
            data={data}
            from={firstDayOfMonth}
            to={lastDayOfMonth}
            leftLabel="Current Month"
            rightLabel={currentMonthName + " " + currentYear}
            altIcon={<IoPieChartSharp className="primary-text md:text-4xl" />}
          />
          <StatisticSection
            data={data}
            leftLabel="All Time"
            rightLabel={"since " + DateOfFirstGame.toLocaleDateString("de-DE")}
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full">
          <MatchSection matchData={data} />
        </div>
      </div>
    </div>
  );
}
