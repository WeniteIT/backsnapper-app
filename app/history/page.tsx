import { IoFootballSharp } from "react-icons/io5";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";
import MatchCard from "../_components/MatchCard";
import { RefineMockUpData } from "../_components/StatisticUtils";

export default function Home() {
  const data = RefineMockUpData();

  return (
    <div className="min-h-screen flex flex-col justify-center p-2 gap-4 sm:p-6 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <BaseSection
            label={
              <IconText
                icon={<IoFootballSharp className="text-yellow-500" />}
                text="Match History"
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
      </div>
    </div>
  );
}
