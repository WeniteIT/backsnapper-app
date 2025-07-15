"use client";

import { IoFootballSharp } from "react-icons/io5";
import { MdMoreTime, MdOutlineWorkHistory } from "react-icons/md";
import BaseSection from "../../_components/common/BaseSection";
import IconText from "../../_components/common/IconText";
import PlayerMatchCard from "../../_components/player/PlayerMatchCard";
import { PlayerSummaryCard } from "@/app/_components/player/PlaySummaryCard";
import BreadCrump from "@/app/_components/common/BreadCrump";
import { IMatchData } from "@/app/interfaces";
import Button from "@/app/_components/common/_Button";
import { useState } from "react";
import { GiDuel } from "react-icons/gi";

interface PlayerPageProps {
  data: IMatchData[];
  player: string;
}

export function PlayerPage({ data, player }: PlayerPageProps) {
  const [showAll, setShowAll] = useState(false);

  const playerWithFirstLetterCapitalized =
    player.charAt(0).toUpperCase() + player.slice(1);

  const playersData = data
    .filter(
      (match) =>
        match.player1.name.toLowerCase() === player.toLowerCase() ||
        match.player2.name.toLowerCase() === player.toLowerCase()
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const collectedCountPlayedAgainst = playersData.reduce((acc, match) => {
    const opponent =
      match.player1.name.toLowerCase() === player.toLowerCase()
        ? match.player2.name
        : match.player1.name;
    acc[opponent] = (acc[opponent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const collectedCountWinnedAgainst = playersData.reduce((acc, match) => {
    const opponent =
      match.player1.name.toLowerCase() === player.toLowerCase()
        ? match.player2.name
        : match.player1.name;
    const isPlayer1 = match.player1.name.toLowerCase() === player.toLowerCase();
    const isPlayer2 = match.player2.name.toLowerCase() === player.toLowerCase();
    if (isPlayer1 && match.player1.score > match.player2.score) {
      acc[opponent] = (acc[opponent] || 0) + 1;
    } else if (isPlayer2 && match.player2.score > match.player1.score) {
      acc[opponent] = (acc[opponent] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const collectedCountPlayedAgainstEntries = Object.entries(
    collectedCountPlayedAgainst
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const highestCount = Math.max(
    ...collectedCountPlayedAgainstEntries.map((entry) => entry[1])
  );

  if (playersData.length === 0) {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <BaseSection
          label={
            <IconText
              icon={<IoFootballSharp className="primary-text text-large" />}
              text="Player Not Found"
            />
          }
          info={`No matches found for ${player}`}
        ></BaseSection>
      </div>
    );
  }

  const displayData = showAll ? playersData : playersData.slice(0, 12);

  return (
    <div className="flex flex-col w-full gap-4">
      <BreadCrump
        label={["Home", "Player", playerWithFirstLetterCapitalized]}
      />
      <div className="flex flex-col xl:flex-row w-full gap-2 md:gap-4">
        <div className="flex flex-col gap-2 md:gap-3 flex-1 md:overflow-hidden">
          <PlayerSummaryCard playerName={player} playersData={playersData} />
          <BaseSection
            label={
              <IconText
                icon={<GiDuel className="primary-text text-large" />}
                text={`Played Against`}
              />
            }
          >
            <div className="flex gap-2 h-50 max-w-100 relative">
              <div className="flex flex-col p-2 gap-1 secondary rounded-lg">
                <div className="secondary-text-light font-bold">{"Wins"}</div>
                <div className="secondary-text-light font-bold">
                  {"Matches"}
                </div>
              </div>
              {[...collectedCountPlayedAgainstEntries].map(
                ([opponent, count]) => (
                  <div
                    key={opponent}
                    className="secondary flex flex-col w-12 items-center justify-start p-2 gap-1 rounded-lg"
                  >
                    <div className="secondary-text-light font-bold">
                      {collectedCountWinnedAgainst[opponent] || 0}
                    </div>
                    <div className="secondary-text-light font-bold">
                      {count}
                    </div>
                    <div
                      style={{ height: (highestCount / 50) * count + "px" }}
                      className="w-10 primary bg-gradient-to-b from-primary to-primary-hover rounded-lg transition-all duration-300"
                    ></div>
                    <span className="font-bold mt-6 rotate-90">{opponent}</span>
                  </div>
                )
              )}
            </div>
          </BaseSection>
          {/* <BaseSection /> */}
        </div>
        <div className="flex flex-col gap-2 md:gap-3 flex-1 md:overflow-hidden h-full">
          <BaseSection
            label={
              <IconText
                icon={
                  <MdOutlineWorkHistory className="primary-text text-large" />
                }
                text={`Match History`}
              />
            }
            info={`${playersData.length} matches`}
          >
            <>
              {displayData.map((match, index) => (
                <PlayerMatchCard
                  key={index}
                  match={match}
                  player={player}
                  prevMatch={playersData[index + 1]}
                />
              ))}
              {!showAll && (
                <div className="flex justify-center">
                  <Button
                    label={
                      <>
                        Show all
                        <MdMoreTime />
                      </>
                    }
                    onClick={() => {
                      setShowAll(!showAll);
                    }}
                    width="100"
                    color="secondary"
                  />
                </div>
              )}
            </>
          </BaseSection>
        </div>
      </div>
    </div>
  );
}
