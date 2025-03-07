import { unstable_cache } from "next/cache";
import { FaTrophy } from "react-icons/fa6";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";
import StatisticCard from "../_components/StatisticCard";
import {
  calculateScore,
  collectLosses,
  collectWinLoseRatio,
  collectWins,
} from "../_components/StatisticUtils";
import { _AnimatedNumber } from "../_components/_AnimatedNumbers";
import { getMatchData } from "../_components/getMatchData";
import { PlayerLink } from "../_components/PlayerLink";

export default async function LeaderboardPage() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

  const wins = collectWins(data);
  const loses = collectLosses(data);
  const ratio = collectWinLoseRatio(data);
  const elo = calculateScore(data);

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full">
        <BaseSection
          label={
            <IconText
              icon={<FaTrophy className="primary-text" />}
              text="Score"
            />
          }
        >
          <>
            {Object.keys(elo)
              .sort((a, b) => elo[b] - elo[a])
              .map((player, index) => (
                <StatisticCard
                  key={player}
                  label={
                    <div className="flex text-normal items-center grow p-2 overflow-hidden">
                      <div className="flex pr-3 pl-2 secondary-text-lighter md:min-w-14">
                        {index + 1}
                      </div>
                      <PlayerLink name={player} />
                    </div>
                  }
                  content={<_AnimatedNumber num={+elo[player].toFixed(0)} />}
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
              text="Win/Lose"
            />
          }
        >
          <>
            {Object.keys(ratio)
              .sort((a, b) => ratio[b] - ratio[a])
              .map((player, index) => (
                <StatisticCard
                  key={player}
                  label={
                    <div className="flex text-normal items-center grow p-2 pr-5 overflow-hidden">
                      <div className="flex pr-3 pl-2 secondary-text-lighter md:min-w-14">
                        {index + 1}
                      </div>
                      <PlayerLink name={player} />
                    </div>
                  }
                  content={
                    <div className="flex w-full justify-between">
                      <_AnimatedNumber num={+ratio[player].toFixed(2)} />
                      <span className="secondary-text-lighter">
                        {Object.entries(wins).map(([name, win]) => {
                          if (name === player) {
                            return win;
                          }
                        })}/
                        {Object.entries(loses).map(([name, lose]) => {
                          if (name === player) {
                            return lose;
                          }
                        })}
                      </span>
                    </div>
                  }
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
              text="Wins"
            />
          }
        >
          <>
            {Object.keys(wins)
              .sort((a, b) => wins[b] - wins[a])
              .map((player, index) => (
                <StatisticCard
                  key={player}
                  label={
                    <div className="flex text-normal items-center grow p-2 pr-5 overflow-hidden">
                      <div className="flex pr-3 pl-2 secondary-text-lighter md:min-w-14">
                        {index + 1}
                      </div>
                      <PlayerLink name={player} />
                    </div>
                  }
                  content={
                    <div className="flex w-full justify-between">
                    <_AnimatedNumber num={+wins[player].toFixed(0)} />
                    <span className="secondary-text-lighter">
                      {Object.entries(loses).map(([name, lose]) => {
                        if (name === player) {
                          return lose;
                        }
                      })}
                    </span>
                  </div>
                  }
                />
              ))}
          </>
        </BaseSection>
      </div>
    </>
  );
}
