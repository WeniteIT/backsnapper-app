import { unstable_cache } from "next/cache";
import { IoFootballSharp } from "react-icons/io5";
import { MdMoreTime, MdOutlineWorkHistory } from "react-icons/md";
import BaseSection from "../../_components/BaseSection";
import IconText from "../../_components/IconText";
import PlayerMatchCard from "../../_components/PlayerMatchCard";
import { getMatchData } from "../../_components/getMatchData";

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

  const slicedData = playersData.slice(0, 16);

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
      <div className="flex flex-col gap-2 md:gap-3 flex-1 md:overflow-hidden h-full">
        <BaseSection
          label={
            <IconText
              icon={
                <MdOutlineWorkHistory className="primary-text text-large" />
              }
              text={playerWithFirstLetterCapitalized}
            />
          }
          info={``}
        >
          <div className="flex justify-center items-center min-h-100 text-large">
            Under construction
          </div>
        </BaseSection>
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
            {slicedData.map((match, index) => (
              <PlayerMatchCard key={index} match={match} player={player} prevMatch={slicedData[index+1]}/>
            ))}
            <div className="flex justify-center">
              <button
                className={`secondary hover-primary flex gap-3 justify-center p-3 rounded-md text-xl w-${100} items-center
       transition-colors duration-300 ease-in-out focus:outline-none cursor-pointer`}
              >
                {
                  <>
                    Show all
                    <MdMoreTime />
                  </>
                }
              </button>
            </div>
          </>
        </BaseSection>
      </div>
    </>
  );
}
