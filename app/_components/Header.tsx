import Link from "next/link";
import { FaHouse, FaTrophy } from "react-icons/fa6";
import { IoFootballSharp } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";
import RouteButton from "./_RouteButton";

function Title() {
  return (
    <Link href="/">
      <div className="flex gap-1 md:gap-2 items-center">
        <div className="primary flex rounded-md px-2 py-1 gap-1 md:gap-4 items-center">
          <TbSoccerField /> Back
        </div>
        SNAPPER <div className="secondary-text-light text-2xl self-end">v0.5e</div>
      </div>
    </Link>
  );
}

export default function Header() {
  return (
    <div className="secondary-no-mode flex flex-col md:flex-row text-xl md:text-5xl font-bold gap-3 p-3 md:p-6 justify-between">
      <Title />
      <div className="flex gap-4">
        <RouteButton
          label={<IoFootballSharp className="text-xl md:text-4xl" />}
          route="/history"
          hover="Matches"
          color="secondary-no-mode"
        />
        <RouteButton
          label={<FaTrophy className="text-xl md:text-4xl" />}
          route="/rankings"
          hover="Rankings"
          color="secondary-no-mode"
        />
        <RouteButton
          label={<FaHouse className="text-xl md:text-4xl" />}
          route="/"
          hover="Home"
          color="secondary-no-mode"
        />
      </div>
    </div>
  );
}
