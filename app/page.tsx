import { unstable_cache } from "next/cache";
import { IoPieChartSharp } from "react-icons/io5";
import MatchSection from "./_components/MatchSection";
import StatisticSection from "./_components/StatisticSection";
import { getMatchData } from "./_components/getMatchData";
import BaseSection from "./_components/BaseSection";
import { FaNewspaper } from "react-icons/fa6";
import IconText from "./_components/IconText";
import { PlayerLink } from "./_components/PlayerLink";

export default async function Home() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

  const news = "Spielt fair und macht viele Backsnapper!";

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
              text={"Message"}
            />
          }
          info={new Date().toLocaleDateString("de-DE")}
        >
          <div className="text-sm md:text-2xl">
            <div className="flex gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden justify-between p-4">
              <span>
                <b><PlayerLink name={"Toni"} /></b>
                {` ${news}`}
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
            "Most Wins",
            "Longest Win Streak",
            "Highest W/L",
            "Most Losses",
            "Lowest W/L",
          ]}
          altIcon={<IoPieChartSharp className="primary-text text-large" />}
        />
        <StatisticSection
          infos={[
            "Most Wins",
            "Longest Win Streak",
            "Highest W/L",
            "Highest Score",
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
