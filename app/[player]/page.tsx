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
    <div className="flex flex-col gap-4 flex-1">
      <BaseSection
        label={
          <IconText
            icon={<IoFootballSharp className="primary-text" />}
            text={player}
          />
        }
      >
        Coming soon
      </BaseSection>
    </div>
  );
}
