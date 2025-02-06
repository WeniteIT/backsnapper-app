import Link from "next/link";
import { FaCommentDots, FaTrophy } from "react-icons/fa";
import { IMatchData } from "../interfaces";

interface IProps {
  match: IMatchData;
}

export default function MatchCard({ match }: IProps) {
  const names = (
    <div className="flex gap-3 flex-1 min-w-70">
      <Link
        href={`/${match.player1.name}`}
        passHref
        className={
          "hover:underline " +
          (match.player2.score < match.player1.score
            ? "text-yellow-500 font-semibold"
            : "")
        }
      >
        {match.player1.name}
      </Link>
      <div className="font-semibold">vs</div>
      <Link
        href={`/${match.player2.name}`}
        passHref
        className={
          "hover:underline " +
          (match.player2.score > match.player1.score
            ? "text-yellow-500 font-semibold"
            : "")
        }
      >
        {match.player2.name}
      </Link>
    </div>
  );

  const scores = (
    <div className="flex items-center font-bold gap-4 justify-center min-w-50 bg-gray-800 text-3xl text-gray-200 relative">
      <div className="flex bg-gray-800 px-4 skew-x-16 absolute -left-2 top-0 bottom-0" />
      <div
        className={
          match.player2.score < match.player1.score ? "text-yellow-500" : ""
        }
      >
        {match.player2.score < match.player1.score ? (
          <FaTrophy />
        ) : (
          match.player1.score
        )}
      </div>

      <div>-</div>
      <div
        className={
          match.player2.score > match.player1.score ? "text-yellow-500" : ""
        }
      >
        {match.player2.score > match.player1.score ? (
          <FaTrophy />
        ) : (
          match.player2.score
        )}
      </div>
    </div>
  );

  const date = (
    <div className="flex text-lg text-gray-400 justify-end flex-1 items-center gap-3">
      {match.comment && (
        <FaCommentDots
          className="pl-2 hover:text-gray-400 cursor-pointer text-gray-800 text-3xl"
          title={match.comment}
        />
      )}
      {new Date(match.date).toLocaleString("de-DE")}
    </div>
  );

  return (
    <div className="flex flex gap-4 bg-gray-100 rounded-lg shadow-md flex-1 relative hover:outline-2 outline-gray-400 overflow-hidden justify-between">
      <div className="flex text-3xl items-center grow p-3 pr-5">
        <div className="flex pr-8 text-gray-300 min-w-20">{match.id}</div>
        {names}
        {date}
      </div>
      {scores}
    </div>
  );
}
