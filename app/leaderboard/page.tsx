import { unstable_cache } from "next/cache";
import { GiPickle } from "react-icons/gi";
import {
  PiRankingDuotone,
  PiRankingFill,
  PiRankingLight,
} from "react-icons/pi";

import {
  TbHexagonLetterAFilled,
  TbHexagonLetterBFilled,
  TbHexagonLetterCFilled,
} from "react-icons/tb";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";
import { PlayerLink } from "../_components/PlayerLink";
import StatisticCard from "../_components/StatisticCard";
import {
  calculateScore,
  collectLosses,
  collectWinLoseRatio,
  collectWins,
} from "../_components/StatisticUtils";
import { _AnimatedNumber } from "../_components/_AnimatedNumbers";
import { getMatchData } from "../_components/getMatchData";

export default async function LeaderboardPage() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

  const wins = collectWins(data);
  const loses = collectLosses(data);
  const ratio = collectWinLoseRatio(data);
  const rating = calculateScore(data);

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-4 flex-1 md:overflow-hidden h-full">
        <BaseSection
          label={
            <IconText
              icon={<PiRankingFill className="primary-text" />}
              text="BS-League-Rating"
            />
          }
        >
          <>
            {Object.keys(rating)
              .sort((a, b) => rating[b] - rating[a])
              .map((player, index) => (
                <StatisticCard
                  key={player}
                  label={
                    <div className="flex text-normal items-center grow p-1 overflow-hidden">
                      <div className="flex secondary-text-lighter md:min-w-10">
                        {index + 1}
                      </div>
                      <PlayerLink name={player} />
                    </div>
                  }
                  content={
                    <div className="flex w-full justify-between">
                      <_AnimatedNumber num={+rating[player].toFixed(0)} />
                      <span className="secondary-text-lighter flex">
                        {(() => {
                          const score = rating[player];
                          if (score >= 1300) {
                            return (
                              <TbHexagonLetterAFilled
                                title="A-League"
                                className="text-biig text-gold"
                              />
                            );
                          }
                          if (score >= 1200) {
                            return (
                              <TbHexagonLetterBFilled
                                title="B-League"
                                className="text-biig text-silver"
                              />
                            );
                          }
                          if (score >= 1100) {
                            return (
                              <TbHexagonLetterCFilled
                                title="C-League"
                                className="text-biig text-bronze"
                              />
                            );
                          }
                          return (
                            <GiPickle
                              title="Cucumber-League"
                              className="text-biig text-success"
                            />
                          );
                        })()}
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
              icon={<PiRankingLight className="primary-text" />}
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
                    <div className="flex text-normal items-center grow p-1 overflow-hidden">
                      <div className="flex secondary-text-lighter md:min-w-10">
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
                        })}
                        /
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
              icon={<PiRankingDuotone className="primary-text" />}
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
                    <div className="flex text-normal items-center grow p-1 overflow-hidden">
                      <div className="flex secondary-text-lighter md:min-w-10">
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
