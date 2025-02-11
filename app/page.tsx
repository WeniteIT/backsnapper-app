import { IoPieChartSharp } from "react-icons/io5";
import MatchSection from "./_components/MatchSection";
import StatisticSection from "./_components/StatisticSection";
import { RefineMockUpData } from "./_components/StatisticUtils";
import { cache } from 'react'
 
export const revalidate = 60;
 
export const getItem = cache(async () => {
  return  await RefineMockUpData();
})

export default async function Home() {
  const data = await getItem();

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
    <div className="secondary-text flex justify-center p-2 gap-4 sm:p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-2 md:gap-4 flex-col-reverse 2xl:flex-row w-500">
        <div className="flex flex-col gap-2 md:gap-4 flex-1 overflow-hidden">
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
            leftLabel="All entries"
            rightLabel={"since " + DateOfFirstGame.toLocaleDateString("de-DE")}
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-4 flex-1 overflow-hidden">
          <MatchSection matchData={data} />
        </div>
      </div>
    </div>
  );
}
