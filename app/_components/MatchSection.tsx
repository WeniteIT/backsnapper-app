import { MdMoreTime, MdOutlineWorkHistory, MdToday } from "react-icons/md";
import { IMatchData } from "../interfaces";
import BaseSection from "./BaseSection";
import IconText from "./IconText";
import MatchCard from "./MatchCard";
import RouteButton from "./_RouteButton";

interface IProps {
  matchData: IMatchData[];
}

export default function MatchSection({ matchData }: IProps) {
  const todaysData = matchData.filter(
    (match) =>
      new Date(match.date).getDate() === new Date().getDate() &&
      new Date(match.date).getMonth() === new Date().getMonth()
  );

  const dataWithoutToday = matchData.filter(
    (match) =>
      new Date(match.date).getDate() !== new Date().getDate() ||
      new Date(match.date).getMonth() !== new Date().getMonth()
  );

  const MAX_ENTRIES = 14;
  const ALL_HISTORY = MAX_ENTRIES - todaysData.length;
  return (
    <>
      {todaysData.length > 0 && (
        <BaseSection
          label={
            <IconText
              icon={<MdToday className="primary-text text-large" />}
              text="Today's Matches"
            />
          }
          info={`${todaysData.length} matches`}
        >
          <>
            {todaysData
              .reverse()
              .slice(0, MAX_ENTRIES)
              .map((match, index) => (
                <MatchCard key={index} match={match} />
              ))}
          </>
        </BaseSection>
      )}
      {ALL_HISTORY > 0 && (
        <BaseSection
          label={
            <IconText
              icon={
                <MdOutlineWorkHistory className="primary-text text-large" />
              }
              text="Match History"
            />
          }
          info={`${matchData.length} matches`}
        >
          <>
            {dataWithoutToday
              .reverse()
              .slice(0, ALL_HISTORY)
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
                color="secondary-light"
              />
            </div>
          </>
        </BaseSection>
      )}
    </>
  );
}
