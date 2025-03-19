"use client";

import { FaChartLine } from "react-icons/fa";
import { IMatchData, IResult } from "../../interfaces";
import BaseSection from "../common/BaseSection";
import IconText from "../common/IconText";
import StatisticCard from "./StatisticCard";
import {
  calculateScore as findScore,
  findBestWinLoseRatio,
  findHighestElo,
  findLongestWinStreak,
  findLowestElo,
  findMostLosses,
  findMostWins,
  findWorstWinLoseRatio,
} from "../StatisticUtils";
import { _AnimatedNumber } from "../common/_AnimatedNumbers";
import { useMemo } from "react";

export type TStatisticInfo = "Most Wins" | "Most Losses" | "Highest W/L" | "Lowest W/L" | "Highest Score" | "Lowest Score" | "Longest Win Streak";
interface IProps {
  from?: Date;
  to?: Date;
  leftLabel?: string;
  rightLabel?: string;
  altIcon?: React.ReactNode;
  data: IMatchData[];
  infos: TStatisticInfo[];
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
  const {
    totalMatches,
    findHighestScore2,
    findLowestScore2,
    highestWinLoseRatio,
    longestWinStreak,
    lowestWinLoseRatio,
    mostLosses,
    mostWins,
  } = useMemo(() => {
    const filteredDataByDate = data.filter((match) => {
      if (from && to) {
        return (
          new Date(match.date).getTime() >= from.getTime() &&
          new Date(match.date).getTime() <= to.getTime()
        );
      }
      return true;
    });

    const filteredScore = findScore(filteredDataByDate);
    const mostWins = findMostWins(filteredDataByDate);
    const mostLosses = findMostLosses(filteredDataByDate);
    const highestWinLoseRatio = findBestWinLoseRatio(filteredDataByDate);
    const lowestWinLoseRatio = findWorstWinLoseRatio(filteredDataByDate);
    const findHighestScore2 = findHighestElo(filteredScore);
    const findLowestScore2 = findLowestElo(filteredScore);
    const longestWinStreak = findLongestWinStreak(filteredDataByDate);

    return {
      totalMatches: filteredDataByDate.length,
      mostWins,
      mostLosses,
      highestWinLoseRatio,
      lowestWinLoseRatio,
      findHighestScore2,
      findLowestScore2,
      longestWinStreak,
    };
  }, [data, from, to]);

  const StatisticInfoMap: Record<TStatisticInfo, IResult> = {
    ["Most Wins"]: mostWins,
    ["Most Losses"]: mostLosses,
    ["Highest W/L"]: highestWinLoseRatio,
    ["Lowest W/L"]: lowestWinLoseRatio,
    ["Highest Score"]: findHighestScore2,
    ["Lowest Score"]: findLowestScore2,
    ["Longest Win Streak"]: longestWinStreak,
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
        content={<_AnimatedNumber num={totalMatches} />}
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
