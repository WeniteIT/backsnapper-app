import BaseSection from "./BaseSection";
import AN from "./AN";
import StatisticCard from "./StatisticCard";
import {
  RefineMockUpData,
  collectMostMatches,
  findBestWinLoseRatio,
  findMostLosses,
  findMostWins,
  findWorstWinLoseRatio,
} from "./StatisticUtils";

interface IProps {
  from?: Date;
  to?: Date;
  infoLabel?: string;
}

export default function StatisticSection({ from, to, infoLabel }: IProps) {
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
  const mostMatches = collectMostMatches(filteredDataByDate);
  const lowestWinLoseRatio = findWorstWinLoseRatio(filteredDataByDate);

  return (
    <BaseSection label="Statistics" info={infoLabel}>
      <StatisticCard label="Total Matches" content={<AN num={filteredDataByDate.length} />} />
      <StatisticCard
        label={"Most Wins"}
        content={
          <>
            <div>{mostWins.name}</div> <AN num={mostWins.num} />
          </>
        }
      />
      <StatisticCard
        label={"Most Losses"}
        content={
          <>
            <div>{mostLoses.name}</div> <AN num={mostLoses.num} />
          </>
        }
      />
      <StatisticCard
        label={"Most Matches played"}
        content={
          <>
            <div>{mostMatches.name}</div> <AN num={mostMatches.num} />
          </>
        }
      />
      <StatisticCard
        label={"Highest W/L Ratio"}
        content={
          <>
            <div>{highestWinLoseRatio.name}</div>{" "}
            <AN num={highestWinLoseRatio.num} />
          </>
        }
      />
      <StatisticCard
        label={"Lowest W/L Ratio"}
        content={
          <>
            <div>{lowestWinLoseRatio.name}</div>{" "}
            <AN num={lowestWinLoseRatio.num} />
          </>
        }
      />
    </BaseSection>
  );
}
