import { FaTrophy } from "react-icons/fa6";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <BaseSection
        label={
          <IconText
            icon={<FaTrophy className="primary-text" />}
            text="Leaderboard"
          />
        }
      >
        Coming soon
      </BaseSection>
    </div>
  );
}
