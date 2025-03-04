import { IoFootballSharp } from "react-icons/io5";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";
import { MdOutlineWorkHistory } from "react-icons/md";
import { unstable_cache } from "next/cache";
import PlayerMatchCard from "../_components/PlayerMatchCard";
import { getMatchData } from "../_components/getMatchData";

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
  
  const playersData = data.filter(
    (match) => match.player1.name === player || match.player2.name === player
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    <div className="flex flex-col gap-4 flex-1">
      <BaseSection
        label={
          <IconText
            icon={<MdOutlineWorkHistory className="primary-text text-large" />}
            text={player+`'s Match History`}
          />
        }
        info={`${playersData.length} matches`}
      >
        <>
          {playersData.map((match, index) => (
            <PlayerMatchCard key={index} match={match} player={player} />
          ))}
        </>
      </BaseSection>
    </div>
  );
}
