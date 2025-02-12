import { FaTrophy } from "react-icons/fa6";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";
import StatisticCard from "../_components/StatisticCard";
import {
  calculateElo,
  collectWinLoseRatio,
  collectWins,
  getMatchData,
} from "../_components/StatisticUtils";
import { _AnimatedNumber } from "../_components/_AnimatedNumbers";

export default async function LeaderboardPage() {
  const data = await getMatchData();

  const wins = collectWins(data);
  const ratio = collectWinLoseRatio(data);
  const elo = calculateElo(data);

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full">
        <BaseSection
          label={
            <IconText
              icon={<FaTrophy className="primary-text" />}
              text="Highest Elo"
            />
          }
        >
          <>
            {Object.keys(elo)
              .sort((a, b) => elo[b] - elo[a])
              .map((player, index) => (
                <StatisticCard
                  key={player}
                  label={index + 1 + ". " + player}
                  content={<_AnimatedNumber num={+elo[player].toFixed(0)} />}
                />
              ))}
          </>
        </BaseSection>
        <BaseSection
          label={
            <IconText
              icon={<FaTrophy className="primary-text" />}
              text="Most Wins"
            />
          }
        >
          <>
            {Object.keys(wins)
              .sort((a, b) => wins[b] - wins[a])
              .map((player, index) => (
                <StatisticCard
                  key={player}
                  label={index + 1 + ". " + player}
                  content={<_AnimatedNumber num={wins[player]} />}
                />
              ))}
          </>
        </BaseSection>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full">
        <BaseSection
          label={
            <IconText
              icon={<FaTrophy className="primary-text" />}
              text="Highest Win/Lose Ratio"
            />
          }
        >
          <>
            {Object.keys(ratio)
              .sort((a, b) => ratio[b] - ratio[a])
              .map((player, index) => (
                <StatisticCard
                  key={player}
                  label={index + 1 + ". " + player}
                  content={<_AnimatedNumber num={+ratio[player].toFixed(2)} />}
                />
              ))}
          </>
        </BaseSection>
      </div>
    </>
  );
}
