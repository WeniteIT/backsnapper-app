import { MdOutlineWorkHistory } from "react-icons/md";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";
import MatchCard from "../_components/MatchCard";
import { getMatchData } from "../_components/StatisticUtils";
import { unstable_cache } from "next/cache";

export default async function HistoryPage() {
  const getData = unstable_cache(async () => getMatchData(), ["matchData"], {
    revalidate: 60,
  });

  const data =( await getData()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col gap-4 flex-1">
      <BaseSection
        label={
          <IconText
            icon={<MdOutlineWorkHistory className="primary-text text-large" />}
            text="Complete Match History"
          />
        }
        info={`${data.length} matches`}
      >
        <>
          {data.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </>
      </BaseSection>
    </div>
  );
}
