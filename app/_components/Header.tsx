import Link from "next/link";
import { FaHouse, FaTrophy } from "react-icons/fa6";
import { MdAssignmentAdd, MdOutlineWorkHistory } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import RouteButton from "./_RouteButton";

function Title() {
  return (
    <Link className="flex items-center" href="/">
      <div className="flex gap-1 items-center">
        <div className="primary flex rounded-md px-2 py-1 items-center ">
          <TbSoccerField className="text-4xl" /> Back
        </div>
        <div className="text-3xl">SNAPPER</div>
      </div>
    </Link>
  );
}

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 secondary border-b primary-border-color flex flex-col md:flex-row text-large font-bold gap-3 p-3 md:p-3 justify-between z-10">
      <Title />
      <div className="flex gap-4">
        <RouteButton
          label={<MdAssignmentAdd className="text-normal" />}
          route="/form"
          hover="Formular"
          color="secondary-no-mode"
        />
        <RouteButton
          label={<MdOutlineWorkHistory className="text-normal" />}
          route="/history"
          hover="Complete Match History"
          color="secondary-no-mode"
        />
        <RouteButton
          label={<FaTrophy className="text-normal" />}
          route="/leaderboard"
          hover="Leaderboard"
          color="secondary-no-mode"
        />
        <RouteButton
          label={<FaHouse className="text-normal" />}
          route="/"
          hover="Home"
          color="secondary-no-mode"
        />
      </div>
    </div>
  );
}
