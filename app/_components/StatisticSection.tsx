import { FaChartLine } from "react-icons/fa";
import { IMatchData } from "../interfaces";
import BaseSection from "./BaseSection";
import IconText from "./IconText";
import StatisticCard from "./StatisticCard";
import {
  calculateElo,
  findBestWinLoseRatio,
  findHighestElo,
  findLowestElo,
  findMostLosses,
  findMostWins,
  findWorstWinLoseRatio,
} from "./StatisticUtils";
import { _AnimatedNumber } from "./_AnimatedNumbers";


interface IProps {
  from?: Date;
  to?: Date;
  leftLabel?: string;
  rightLabel?: string;
  altIcon?: React.ReactNode;
  data: IMatchData[];
}

export default function StatisticSection({
  from,
  to,
  leftLabel,
  rightLabel,
  altIcon,
  data,
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
      <StatisticCard label={"Wins"} result={mostWins} />
      <StatisticCard label={"Most Losses"} result={mostLoses} />
      <StatisticCard label={"Highest W/L"} result={highestWinLoseRatio} />
      <StatisticCard label={"Lowest W/L"} result={lowestWinLoseRatio} />
      <StatisticCard label={"Highest Elo"} result={findHighestScore2} />
      <StatisticCard label={"Lowest Elo"} result={findLowestScore2} />
    </BaseSection>
  );
}
