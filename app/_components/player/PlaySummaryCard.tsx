"use client";

import { getLeague } from "@/app/leaderboard/leagueUtils";
import { RiGameFill } from "react-icons/ri";
import BaseSection from "../common/BaseSection";
import IconText from "../common/IconText";
import { _AnimatedNumber } from "../common/_AnimatedNumbers";
import StatisticCard from "../statistic/StatisticCard";
import { IMatchData } from "@/app/interfaces";
import { collectWins, collectLosses } from "../StatisticUtils";

interface IPlayerSummaryCardProps {
  playerName: string;
  playersData: IMatchData[];
}

export function PlayerSummaryCard({
  playerName,
  playersData,
}: IPlayerSummaryCardProps) {
  const playerWithFirstLetterCapitalized =
    playerName.charAt(0).toUpperCase() + playerName.slice(1);

  const wins = collectWins(playersData)[playerWithFirstLetterCapitalized];
  const losses = collectLosses(playersData)[playerWithFirstLetterCapitalized];
  const wl = wins / losses;

  const rating = (
    playersData[0].player1.name.toLowerCase() === playerName.toLowerCase()
      ? playersData[0].player1.points
      : playersData[0].player2.points
  ).toFixed(0);

  return (
    <div className="flex flex-col gap-2 md:gap-3 flex-1 md:overflow-hidden h-55">
      <BaseSection>
        <div className="flex flex-col gap-3">
          <StatisticCard
            label={
              <div className="text-large p-1">
                <IconText
                  icon={<RiGameFill className="primary-text text-large" />}
                  text={playerWithFirstLetterCapitalized}
                />
              </div>
            }
            content={
              <div className="flex w-full justify-between text-large">
                <_AnimatedNumber num={+rating} />
                <span className="secondary-text-lighter flex">
                  {(() => {
                    return getLeague(+rating).icon;
                  })()}
                </span>
              </div>
            }
          />
          <div className="flex gap-3">
            <StatisticCard label="Matches" content={playersData.length} />
            <StatisticCard label="W/L" content={wl.toFixed(2)} />
          </div>
          <div className="flex gap-3">
            <StatisticCard label="Wins" content={wins} />
            <StatisticCard label="Losses" content={losses} />
          </div>
        </div>
      </BaseSection>
    </div>
  );
}
