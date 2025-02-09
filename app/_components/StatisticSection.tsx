import { FaChartLine } from "react-icons/fa";
import BaseSection from "./BaseSection";
import IconText from "./IconText";
import StatisticCard from "./StatisticCard";
import {
  RefineMockUpData,
  findBestWinLoseRatio,
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
}

export default function StatisticSection({
  from,
  to,
  leftLabel,
  rightLabel,
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

  const mostWins = findMostWins(filteredDataByDate);
  const mostLoses = findMostLosses(filteredDataByDate);
  const highestWinLoseRatio = findBestWinLoseRatio(filteredDataByDate);
  const lowestWinLoseRatio = findWorstWinLoseRatio(filteredDataByDate);

  return (
    <BaseSection
      label={
        <IconText
          icon={<FaChartLine className="primary-text" />}
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
      {/* <StatisticCard
        label={"Most Matches played"}
        content={
          <>
            <Link
              href={`/${mostMatches.name}`}
              passHref
              className={"hover:underline "}
            >
              {mostMatches.name}
            </Link>
            <AN num={mostMatches.num} />
          </>
        }
      /> */}
      <StatisticCard label={"Highest W/L"} result={highestWinLoseRatio} />
      <StatisticCard label={"Lowest W/L"} result={lowestWinLoseRatio} />
    </BaseSection>
  );
}
