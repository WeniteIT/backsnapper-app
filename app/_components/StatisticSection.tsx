import { FaChartLine } from "react-icons/fa";
import BaseSection from "./BaseSection";
import IconText from "./IconText";
import StatisticCard from "./StatisticCard";
import {
  RefineMockUpData,
  collectScores,
  findBestWinLoseRatio,
  findMostLosses,
  findMostWins,
  findWorstWinLoseRatio,
  findHighestScore,
  findLowestScore,
} from "./StatisticUtils";
import { _AnimatedNumber } from "./_AnimatedNumbers";

interface IProps {
  from?: Date;
  to?: Date;
  leftLabel?: string;
  rightLabel?: string;
  altIcon?: React.ReactNode;
}

export default function StatisticSection({
  from,
  to,
  leftLabel,
  rightLabel,
  altIcon
}: IProps) {
  const data = RefineMockUpData();

  const filteredDataByDate = data.filter((match) => {
    if (from && to) {
      return (
        new Date(match.date).getTime() >= from.getTime() &&
        new Date(match.date).getTime() <= to.getTime()
      );
    }
    return true;
  });

  const filteredScore = collectScores(filteredDataByDate);

  const mostWins = findMostWins(filteredDataByDate);
  const mostLoses = findMostLosses(filteredDataByDate);
  const highestWinLoseRatio = findBestWinLoseRatio(filteredDataByDate);
  const lowestWinLoseRatio = findWorstWinLoseRatio(filteredDataByDate);
  const findHighestScore2 = findHighestScore(filteredScore);
  const findLowestScore2 = findLowestScore(filteredScore);

  return (
    <BaseSection
      label={
        <IconText
          icon={altIcon || <FaChartLine className="primary-text md:text-4xl" />}
          text={leftLabel}
        />
      }
      info={rightLabel}
    >
      <StatisticCard
        label="Total Matches"
        content={<_AnimatedNumber num={filteredDataByDate.length} />}
      />
      <StatisticCard label={"Most Wins"} result={mostWins} />
      <StatisticCard label={"Most Losses"} result={mostLoses} />
      <StatisticCard label={"Highest W/L"} result={highestWinLoseRatio} />
      <StatisticCard label={"Lowest W/L"} result={lowestWinLoseRatio} />
      <StatisticCard label={"Highest Score"} result={findHighestScore2} />
      <StatisticCard label={"Lowest Score"} result={findLowestScore2} />
    </BaseSection>
  );
}
