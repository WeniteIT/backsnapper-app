import Link from "next/link";
import { FaHouse, FaTrophy } from "react-icons/fa6";
import { IoFootballSharp } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import RouteButton from "./_RouteButton";

function Title() {
  return (
    <Link className="flex items-center" href="/">
      <div className="flex gap-1 md:gap-2 items-center">
        <div className="primary flex rounded-md px-2 py-1 gap-1 md:gap-4 items-center">
          <TbSoccerField /> Back
        </div>
        SNAPPER{" "}
        {/* <div className="secondary-text-light text self-end">v0.5e</div> */}
      </div>
    </Link>
  );
}

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-zinc-800 md:bg-transparent flex flex-col md:flex-row text-large font-bold gap-3 p-3 md:p-4 justify-between z-10">
      <Title />
      <div className="flex gap-4">
        <RouteButton
          label={<MdAssignmentAdd className="text-normal" />}
          route="/form"
          hover="Formular"
          color="secondary-no-mode"
        />
        <RouteButton
          label={<IoFootballSharp className="text-normal" />}
          route="/history"
          hover="Matches"
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
