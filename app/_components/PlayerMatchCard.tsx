import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import { RiSwordLine } from "react-icons/ri";
import { IMatchData } from "../interfaces";
import { _AnimatedNumber } from "./_AnimatedNumbers";

interface IProps {
  match: IMatchData;
  player: string;
}

export default function PlayerMatchCard({ match, player }: IProps) {
  const isPlayerOne = match.player1.name === player;
  const isPlayerTwo = match.player2.name === player;
  const names = (
    <div className="flex gap-1 md:gap-3 flex-1 md:min-w-70 whitespace-norwrap overflow-hidden items-center">
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
      <div className="font-semibold">
        <RiSwordLine />
      </div>
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
    <div className="secondary flex items-center font-bold gap-1 md:gap-3 justify-center min-w-28 md:min-w-32 text-normal relative ">
      <div className="flex secondary px-4 skew-x-16 absolute -left-2 top-0 bottom-0" />
      <div
        className={
          match.player2.score < match.player1.score ? "primary-text" : ""
        }
      >
        {match.player2.score < match.player1.score ? (
          <FaTrophy />
        ) : (
          <_AnimatedNumber num={match.player1.score} />
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
          <_AnimatedNumber num={match.player2.score} />
        )}
      </div>
    </div>
  );

  const comment = (
    <div
      title={match.comment}
      className="hidden md:flex text-smoll secondary-text-light justify-end flex-1 items-center gap-3 italic whitespace-nowrap text-ellipsis overflow-hidden pr-1"
    >
      {match.comment && `"${match.comment}"`}
    </div>
  );

  return (
    <div
      className={`flex gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden justify-between max-h-12 outline outline-dashed ${
        isPlayerOne
          ? match.player1.score > match.player2.score
            ? "outline-green-800"
            : "outline-red-800"
          : isPlayerTwo
          ? match.player2.score > match.player1.score
            ? "outline-green-800"
            : "outline-red-800"
          : ""
      }`}
    >
      <div className="flex text-normal items-center grow p-2 pr-5 overflow-hidden">
        <div className="flex pr-3 pl-2 secondary-text-lighter md:min-w-14">
          {match.id}
        </div>
        {names}
        {comment}
      </div>
      {scores}
    </div>
  );
}
