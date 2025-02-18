import { MdOutlineWorkHistory } from "react-icons/md";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";
import MatchCard from "../_components/MatchCard";
import { getMatchData } from "../_components/StatisticUtils";

export default async function HistoryPage() {
  const data = await getMatchData();

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
          {data.reverse().map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </>
      </BaseSection>
    </div>
  );
}
