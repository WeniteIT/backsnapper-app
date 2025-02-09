import Link from "next/link";
import { FaChartLine } from "react-icons/fa";
import AN from "./AN";
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
  // const mostMatches = collectMostMatches(filteredDataByDate);
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
        content={<AN num={filteredDataByDate.length} />}
      />
      <StatisticCard
        label={"Most Wins"}
        content={
          <>
            <Link
              href={`/${mostWins.name}`}
              passHref
              className={"hover:underline "}
            >
              {mostWins.name}
            </Link>{" "}
            <AN num={mostWins.num} />
          </>
        }
      />
      <StatisticCard
        label={"Most Losses"}
        content={
          <>
            <Link
              href={`/${mostLoses.name}`}
              passHref
              className={"hover:underline "}
            >
              {mostLoses.name}
            </Link>
            <AN num={mostLoses.num} />
          </>
        }
      />
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
      <StatisticCard
        label={"Highest W/L Ratio"}
        content={
          <>
            <Link
              href={`/${highestWinLoseRatio.name}`}
              passHref
              className={"hover:underline "}
            >
              {highestWinLoseRatio.name}
            </Link>
            <AN num={highestWinLoseRatio.num} />
          </>
        }
      />
      <StatisticCard
        label={"Lowest W/L Ratio"}
        content={
          <>
            <Link
              href={`/${lowestWinLoseRatio.name}`}
              passHref
              className={"hover:underline "}
            >
              {lowestWinLoseRatio.name}
            </Link>
            <AN num={lowestWinLoseRatio.num} />
          </>
        }
      />
    </BaseSection>
  );
}
