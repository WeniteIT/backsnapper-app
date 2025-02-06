import { IoFootballSharp } from "react-icons/io5";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const player = (await params).player;
  return (
    <div className="flex flex-col justify-center p-2 gap-4 sm:p-6 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <BaseSection
            label={
              <IconText
                icon={<IoFootballSharp className="text-yellow-500" />}
                text={player}
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
