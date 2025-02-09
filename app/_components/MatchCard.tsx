import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import { IMatchData } from "../interfaces";
import AN from "./AN";

interface IProps {
  match: IMatchData;
}

export default function MatchCard({ match }: IProps) {
  const names = (
    <div className="flex gap-1 md:gap-3 flex-1 md:min-w-70">
      <Link
        href={`/${match.player1.name}`}
        passHref
        className={
          "hover:underline " +
          (match.player2.score < match.player1.score
            ? "primary-text font-semibold"
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
            ? "primary-text font-semibold"
            : "")
        }
      >
        {match.player2.name}
      </Link>
    </div>
  );

  const scores = (
    <div className="secondary flex items-center font-bold gap-1 md:gap-3 justify-center min-w-24 md:min-w-50 text:xl md:text-3xl relative">
      <div className="flex secondary px-4 skew-x-16 absolute -left-2 top-0 bottom-0" />
      <div
        className={
          match.player2.score < match.player1.score ? "primary-text" : ""
        }
      >
        {match.player2.score < match.player1.score ? (
          <FaTrophy />
        ) : (
          <AN num={match.player1.score} />
        )}
      </div>

      <div>-</div>
      <div
        className={
          match.player2.score > match.player1.score ? "primary-text" : ""
        }
      >
        {match.player2.score > match.player1.score ? (
          <FaTrophy />
        ) : (
          <AN num={match.player2.score} />
        )}
      </div>
    </div>
  );

  const date = (
    <div
      title={match.comment}
      className="hidden md:flex text-lg secondary-text-light justify-end flex-1 items-center gap-3 italic whitespace-nowrap text-ellipsis overflow-hidden"
    >
      {match.comment && `"${match.comment}"`}
    </div>
  );

  return (
    <div className="flex gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden justify-between">
      <div className="flex text-xl md:text-3xl items-center grow p-3 pr-5">
        <div className="flex pr-3 md:pr-8 secondary-text-lighter md:min-w-20">
          {match.id}
        </div>
        {names}
        {date}
      </div>
      {scores}
    </div>
  );
}
