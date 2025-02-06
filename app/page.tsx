import { IoFootballSharp } from "react-icons/io5";
import { MdMoreTime } from "react-icons/md";
import BaseSection from "./_components/BaseSection";
import IconText from "./_components/IconText";
import MatchCard from "./_components/MatchCard";
import RouteButton from "./_components/RouteButton";
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

  const todaysData = data.filter(
    (match) =>
      new Date(match.date).getDate() === new Date().getDate() &&
      new Date(match.date).getMonth() === new Date().getMonth()
  );

  const dataWithoutToday = data.filter(
    (match) =>
      new Date(match.date).getDate() !== new Date().getDate() ||
      new Date(match.date).getMonth() !== new Date().getMonth()
  );

  return (
    <div className="flex flex-col justify-center p-2 gap-4 sm:p-6 text-gray-800 font-[family-name:var(--font-geist-sans)]">
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
          <BaseSection
            label={
              <IconText
                icon={<IoFootballSharp className="text-yellow-500" />}
                text="Today's Matches"
              />
            }
            info={`${todaysData.length} matches`}
          >
            <>
              {todaysData
                .reverse()
                .slice(0, 13)
                .map((match, index) => (
                  <MatchCard key={index} match={match} />
                ))}
            </>
          </BaseSection>
          <BaseSection
            label={
              <IconText
                icon={<IoFootballSharp className="text-yellow-500" />}
                text="Match History"
              />
            }
            info={`${data.length} matches`}
          >
            <>
              {dataWithoutToday
                .reverse()
                .slice(0, 8)
                .map((match, index) => (
                  <MatchCard key={index} match={match} />
                ))}
              <div className="flex justify-center">
                <RouteButton
                  label={
                    <>
                      Show all
                      <MdMoreTime />
                    </>
                  }
                  route="/history"
                  width="100"
                />
              </div>
            </>
          </BaseSection>
        </div>
      </div>
    </div>
  );
}
