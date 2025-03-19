import StatisticCard from "@/app/_components/statistic/StatisticCard";
import { collectLosses, collectWins } from "@/app/_components/StatisticUtils";
import { _AnimatedNumber } from "@/app/_components/common/_AnimatedNumbers";
import { getLeague } from "@/app/leaderboard/leagueUtils";
import { unstable_cache } from "next/cache";
import { IoFootballSharp } from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import BaseSection from "../../_components/common/BaseSection";
import IconText from "../../_components/common/IconText";
import PlayerMatchCard from "../../_components/player/PlayerMatchCard";
import { getMatchData } from "../../_components/getMatchData";
import { PlayerSummaryCard } from "@/app/_components/player/PlaySummaryCard";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const player = decodeURIComponent((await params).player);
  const playerWithFirstLetterCapitalized =
    player.charAt(0).toUpperCase() + player.slice(1);

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

  const wins = collectWins(playersData)[playerWithFirstLetterCapitalized];
  const losses = collectLosses(playersData)[playerWithFirstLetterCapitalized];
  const wl = wins / losses;

  const rating = (
    playersData[0].player1.name.toLowerCase() === player.toLowerCase()
      ? playersData[0].player1.points
      : playersData[0].player2.points
  ).toFixed(0);

  // const slicedData = playersData.slice(0, 16);

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
    <>
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
    </>
  );
}
