import { FaChartLine } from "react-icons/fa";
import { IMatchData } from "../interfaces";
import BaseSection from "./BaseSection";
import IconText from "./IconText";
import StatisticCard from "./StatisticCard";
import {
  calculateElo,
  findBestWinLoseRatio,
  findHighestElo,
  findLongestWinStreak,
  findLowestElo,
  findMostLosses,
  findMostWins,
  findWorstWinLoseRatio,
} from "./StatisticUtils";
import { _AnimatedNumber } from "./_AnimatedNumbers";

export enum StatisticInfo {
  MOST_WINS = "Most Wins",
  MOST_LOSES = "Most Loses",
  HIGHEST_WIN_LOSE_RATIO = "Highest W/L",
  LOWEST_WIN_LOSE_RATIO = "Lowest W/L",
  HIGHEST_SCORE = "Highest Score",
  LOWEST_SCORE = "Lowest Score",
  LONGEST_WIN_STREAK = "Longest Win Streak",
}
interface IProps {
  from?: Date;
  to?: Date;
  leftLabel?: string;
  rightLabel?: string;
  altIcon?: React.ReactNode;
  data: IMatchData[];
  infos: StatisticInfo[];
}

export default function StatisticSection({
  from,
  to,
  leftLabel,
  rightLabel,
  altIcon,
  data,
  infos,
}: IProps) {
  const filteredDataByDate = data.filter((match) => {
    if (from && to) {
      return (
        new Date(match.date).getTime() >= from.getTime() &&
        new Date(match.date).getTime() <= to.getTime()
      );
    }
    return true;
  });

  const filteredScore = calculateElo(filteredDataByDate);

  const mostWins = findMostWins(filteredDataByDate);
  const mostLoses = findMostLosses(filteredDataByDate);
  const highestWinLoseRatio = findBestWinLoseRatio(filteredDataByDate);
  const lowestWinLoseRatio = findWorstWinLoseRatio(filteredDataByDate);
  const findHighestScore2 = findHighestElo(filteredScore);
  const findLowestScore2 = findLowestElo(filteredScore);
  const longestWinStreak = findLongestWinStreak(filteredDataByDate);

  const StatisticInfoMap = {
    [StatisticInfo.MOST_WINS]: mostWins,
    [StatisticInfo.MOST_LOSES]: mostLoses,
    [StatisticInfo.HIGHEST_WIN_LOSE_RATIO]: highestWinLoseRatio,
    [StatisticInfo.LOWEST_WIN_LOSE_RATIO]: lowestWinLoseRatio,
    [StatisticInfo.HIGHEST_SCORE]: findHighestScore2,
    [StatisticInfo.LOWEST_SCORE]: findLowestScore2,
    [StatisticInfo.LONGEST_WIN_STREAK]: longestWinStreak,
  };

  return (
    <BaseSection
      label={
        <IconText
          icon={altIcon || <FaChartLine className="primary-text text-large" />}
          text={leftLabel}
        />
      }
      info={rightLabel}
    >
      <StatisticCard
        label="Total Matches"
        content={<_AnimatedNumber num={filteredDataByDate.length} />}
      />

      {infos?.map((info) => (
        <StatisticCard
          key={info}
          label={info}
          result={StatisticInfoMap[info]}
        />
      ))}
    </BaseSection>
  );
}
