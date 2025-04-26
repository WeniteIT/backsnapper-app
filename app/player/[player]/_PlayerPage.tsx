"use client";

import { unstable_cache } from "next/cache";
import { IoFootballSharp } from "react-icons/io5";
import { MdMoreTime, MdOutlineWorkHistory } from "react-icons/md";
import BaseSection from "../../_components/common/BaseSection";
import IconText from "../../_components/common/IconText";
import PlayerMatchCard from "../../_components/player/PlayerMatchCard";
import { getMatchData } from "../../_components/getMatchData";
import { PlayerSummaryCard } from "@/app/_components/player/PlaySummaryCard";
import BreadCrump from "@/app/_components/common/BreadCrump";
import { IMatchData } from "@/app/interfaces";
import RouteButton from "@/app/_components/common/_RouteButton";
import Button from "@/app/_components/common/_Button";
import { useState } from "react";

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
          <BaseSection />
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
