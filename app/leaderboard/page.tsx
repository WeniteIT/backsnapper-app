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
import { unstable_cache } from "next/cache";
import Link from "next/link";

export default async function LeaderboardPage() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

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
                    <div className="flex text-normal items-center grow p-2 pr-5 overflow-hidden">
                      <div className="flex pr-3 pl-2 secondary-text-lighter md:min-w-14">
                        {index}
                      </div>
                      <Link
                        href={`/${player}`}
                        passHref
                        className={`hover:underline}`}
                      >
                        {player}
                      </Link>
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
                        {index}
                      </div>
                      <Link
                        href={`/${player}`}
                        passHref
                        className={`hover:underline}`}
                      >
                        {player}
                      </Link>
                    </div>
                  }
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
                        {index}
                      </div>
                      <Link
                        href={`/${player}`}
                        passHref
                        className={`hover:underline}`}
                      >
                        {player}
                      </Link>
                    </div>
                  }
                  content={<_AnimatedNumber num={+ratio[player].toFixed(2)} />}
                />
              ))}
          </>
        </BaseSection>
      </div>
    </>
  );
}
