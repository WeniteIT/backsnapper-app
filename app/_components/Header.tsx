import Link from "next/link";
import { FaHouse, FaTrophy } from "react-icons/fa6";
import { IoFootballSharp } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";
import RouteButton from "./RouteButton";

function Title() {
  return (
    <Link href="/">
      <div className="flex gap-2 items-center">
        <div className="primary flex rounded-md px-2 py-1 gap-4">
          <TbSoccerField /> Back
        </div>
        SNAPPER <div className="secondary-text-light">v0.4</div>
      </div>
    </Link>
  );
}

export default function Header() {
  return (
    <div className="secondary flex flex-col md:flex-row text-xl md:text-5xl font-bold gap-3 p-3 md:p-6 justify-between">
      <Title />
      <div className="flex gap-4">
        <RouteButton
          label={<IoFootballSharp className="text-xl md:text-4xl" />}
          route="/history"
          hover="Matches"
        />
        <RouteButton
          label={<FaTrophy className="text-xl md:text-4xl" />}
          route="/rankings"
          hover="Rankings"
        />
        <RouteButton
          label={<FaHouse className="text-xl md:text-4xl" />}
          route="/"
          hover="Home"
        />
      </div>
    </div>
  );
}
