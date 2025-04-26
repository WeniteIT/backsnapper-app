import { unstable_cache } from "next/cache";
import { getMatchData } from "../../_components/getMatchData";
import { PlayerPage } from "./_PlayerPage";

export default async function PlayerPageRoute({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const player = decodeURIComponent((await params).player);
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });
  const data = await getData();

  return <PlayerPage data={data} player={player} />;
}
