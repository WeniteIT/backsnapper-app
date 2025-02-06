import BaseSection from "./BaseSection";
import StatisticCard from "./StatisticCard";
import {
  RefineMockUpData,
  collectMostMatches,
  findBestWinLoseRatio,
  findMostLosses,
  findMostWins,
  findWorstWinLoseRatio,
} from "./StatisticUtils";

export default function StatisticSection() {
  return (
    <BaseSection label="Statistics">
      <StatisticCard
        label="Total Matches"
        content={<>{RefineMockUpData().length.toString()}</>}
      />
      <StatisticCard
        label={"Most Wins"}
        content={
          <>
            {findMostWins()
              .split("/")
              .map((x, i) => {
                return <div key={i}>{x}</div>;
              })}
          </>
        }
      />
      <StatisticCard
        label={"Most Losses"}
        content={
          <>
            {findMostLosses()
              .split("/")
              .map((x, i) => {
                return <div key={i}>{x}</div>;
              })}
          </>
        }
      />
      <StatisticCard
        label={"Most Matches played"}
        content={
          <>
            {collectMostMatches()
              .split("/")
              .map((x, i) => {
                return <div key={i}>{x}</div>;
              })}
          </>
        }
      />
      <StatisticCard
        label={"Highest W/L Ratio"}
        content={
          <>
            {findBestWinLoseRatio()
              .split("/")
              .map((x, i) => {
                return <div key={i}>{x}</div>;
              })}
          </>
        }
      />
      <StatisticCard
        label={"Lowest W/L Ratio"}
        content={
          <>
            {findWorstWinLoseRatio()
              .split("/")
              .map((x, i) => {
                return <div key={i}>{x}</div>;
              })}
          </>
        }
      />
    </BaseSection>
  );
}
