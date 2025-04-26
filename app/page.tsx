import { unstable_cache } from "next/cache";
import { IoPieChartSharp } from "react-icons/io5";
import MatchSection from "./_components/match/MatchSection";
import StatisticSection from "./_components/statistic/StatisticSection";
import { getMatchData } from "./_components/getMatchData";
import BaseSection from "./_components/common/BaseSection";
import { FaNewspaper } from "react-icons/fa6";
import IconText from "./_components/common/IconText";

export default async function Home() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

  const newsHeader ="BS-Regel#1: "
  const news = "Wer einen Backsnapper praktiziert, ist dazu angehalten, das Offensichtliche lautstark zu verkünden.";

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
    <>
      <div className="flex flex-col gap-2 md:gap-3 flex-1 md:overflow-hidden h-full">
        <BaseSection
          label={
            <IconText
              icon={<FaNewspaper className="primary-text text-large" />}
              text={"News"}
            />
          }
          info={new Date().toLocaleDateString("de-DE")}
        >
          <div className="text-lg md:text-xl">
            <div className="flex flex-col gap-1 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden justify-between p-3 pl-4">
              <div className="font-bold">{newsHeader}</div>
              <span style={{ lineHeight: "1.7rem" }}>
                {news}
              </span>
            </div>
          </div>
        </BaseSection>
        <StatisticSection
          data={data}
          from={firstDayOfMonth}
          to={lastDayOfMonth}
          leftLabel="Current Month"
          rightLabel={currentMonthName + " " + currentYear}
          infos={[
            "Highest W/L",
            "Most Wins",
            "Win Streak",
            "Lowest W/L",
            "Most Losses",
          ]}
          altIcon={<IoPieChartSharp className="primary-text text-large" />}
        />
        <StatisticSection
          infos={[
            "Highest Score",
            "Highest W/L",
            "Most Wins",
            "Win Streak",
          ]}
          data={data}
          leftLabel="All Time"
          rightLabel={"since " + DateOfFirstGame.toLocaleDateString("de-DE")}
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-3 flex-1 md:overflow-hidden h-full">
        <MatchSection matchData={data} />
      </div>
    </>
  );
}
