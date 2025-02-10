import { FaTrophy } from "react-icons/fa6";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";

export default function RankingsPage() {
  return (
    <div className="flex flex-col justify-center p-2 gap-4 sm:p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <BaseSection
            label={
              <IconText
                icon={<FaTrophy className="primary-text" />}
                text="Rankings"
              />
            }
          >
            Coming soon
          </BaseSection>
        </div>
      </div>
    </div>
  );
}
