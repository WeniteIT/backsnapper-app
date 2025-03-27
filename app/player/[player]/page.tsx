import { unstable_cache } from "next/cache";
import { IoFootballSharp } from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import BaseSection from "../../_components/common/BaseSection";
import IconText from "../../_components/common/IconText";
import PlayerMatchCard from "../../_components/player/PlayerMatchCard";
import { getMatchData } from "../../_components/getMatchData";
import { PlayerSummaryCard } from "@/app/_components/player/PlaySummaryCard";
import BreadCrump from "@/app/_components/common/BreadCrump";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const player = decodeURIComponent((await params).player);

  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

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

  return (
    <div className="flex flex-col w-full gap-4">
      <BreadCrump label={["Home", "Player", player]} />
      <div className="flex flex-row w-full gap-2 md:gap-4">
        <PlayerSummaryCard playerName={player} playersData={playersData} />
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
              {playersData.map((match, index) => (
                <PlayerMatchCard
                  key={index}
                  match={match}
                  player={player}
                  prevMatch={playersData[index + 1]}
                />
              ))}
            </>
          </BaseSection>
        </div>
      </div>
    </div>
  );
}
