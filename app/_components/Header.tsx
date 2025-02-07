import { FaHouse, FaTrophy } from "react-icons/fa6";
import { IoFootballSharp } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";
import RouteButton from "./RouteButton";
import Link from "next/link";

function Title() {
  return (
    <Link href="/">
      <div className="flex gap-2 items-center">
        <div className="flex bg-yellow-500 rounded-md text-gray-800 px-2 py-1 gap-4">
          <TbSoccerField /> Back
        </div>
        SNAPPER <div className="text-gray-600">v0.4</div>
      </div>
    </Link>
  );
}

export default function Header() {
  return (
    <div className="flex text-5xl font-bold text-gray-100 p-6 bg-gray-800 justify-between">
      <Title />
      <div className="flex gap-4">
        <RouteButton
          label={<IoFootballSharp className="text-4xl" />}
          route="/history"
          hover="Matches"
        />
        <RouteButton
          label={<FaTrophy className="text-4xl" />}
          route="/rankings"
          hover="Rankings"
        />
        <RouteButton
          label={<FaHouse className="text-4xl" />}
          route="/"
          hover="Home"
        />
      </div>
    </div>
  );
}
