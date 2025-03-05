import BaseSection from "@/app/_components/BaseSection";
import IconText from "@/app/_components/IconText";
import { MdOutlineWorkHistory } from "react-icons/md";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ player: string; playerTwo: string }>;
}) {
  const props = await params;

  const player1 = decodeURIComponent(props.player);
  const player2 = decodeURIComponent(props.playerTwo);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <BaseSection
        label={
          <IconText
            icon={<MdOutlineWorkHistory className="primary-text text-large" />}
            text={`Compare ${player1} and ${player2}`}
          />
        }
        info={``}
      ></BaseSection>
    </div>
  );
}
