import BaseSection from "@/app/_components/common/BaseSection";
import IconText from "@/app/_components/common/IconText";
import { getMatchData } from "@/app/_components/getMatchData";
import MatchCard from "@/app/_components/match/MatchCard";
import { PlayerSummaryCard } from "@/app/_components/player/PlaySummaryCard";
import PlayerMatchCard from "@/app/_components/player/PlayerMatchCard";
import { unstable_cache } from "next/cache";
import { MdOutlineWorkHistory } from "react-icons/md";

export default async function VersusPage({
  params,
}: {
  params: Promise<{ player: string; playerTwo: string }>;
}) {
  const props = await params;

  const player1 = decodeURIComponent(props.player);
  const player2 = decodeURIComponent(props.playerTwo);

  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data = await getData();

  const playersData = data
    .filter(
      (match) =>
        (match.player1.name.toLowerCase() === player1.toLowerCase() &&
          match.player2.name.toLowerCase() === player2.toLowerCase()) ||
        (match.player2.name.toLowerCase() === player1.toLowerCase() &&
          match.player1.name.toLowerCase() === player2.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <div className="flex gap-3">
          <PlayerSummaryCard playerName={player1} playersData={playersData} />
          <PlayerSummaryCard playerName={player2} playersData={playersData} />
        </div>
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
              <MatchCard
                key={index}
                match={match}
              />
            ))}
          </>
        </BaseSection>
      </div>
    </>
  );
}
