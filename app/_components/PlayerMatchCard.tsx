import { FaTrophy } from "react-icons/fa";
import { RiSwordLine } from "react-icons/ri";
import { IMatchData } from "../interfaces";
import { PlayerLink } from "./PlayerLink";

interface IProps {
  match: IMatchData;
  player: string;
}

export default function PlayerMatchCard({ match, player }: IProps) {
  const isPlayerOne = match.player1.name.toLowerCase() === player.toLowerCase();
  const names = (
    <div className="flex gap-1 md:gap-3 flex-1 md:min-w-70 whitespace-norwrap overflow-hidden items-center">
      <PlayerLink
        name={isPlayerOne ? match.player2.name : match.player1.name}
      />
    </div>
  );

  const scores = (
    <div className="secondary flex items-center font-bold gap-1 md:gap-3 justify-center min-w-22 md:min-w-24 text-normal relative ">
      <div
        className={`flex px-2 skew-x-16 absolute -left-2 top-0 bottom-0 ${
          isPlayerOne
            ? match.player1.score > match.player2.score
              ? "success"
              : "failure"
            : match.player2.score > match.player1.score
            ? "success"
            : "failure"
        }`}
      />
      <div
        className={
          isPlayerOne
            ? match.player1.score > match.player2.score
              ? "primary-text"
              : ""
            : match.player2.score > match.player1.score
            ? "primary-text"
            : ""
        }
      >
        {isPlayerOne ? (
          match.player1.score > match.player2.score ? (
            <FaTrophy />
          ) : (
            <div>{match.player1.score}</div>
          )
        ) : match.player2.score > match.player1.score ? (
          <FaTrophy />
        ) : (
          <div>{match.player2.score}</div>
        )}
      </div>
    </div>
  );
  
  const slice = 34;
  const comment = (
    <div
      title={match.comment + (match.comment && " - ") + match.date}
      className="hidden md:flex text-smoll secondary-text-lighter justify-end flex-1 items-center gap-3 italic whitespace-nowrap text-ellipsis overflow-hidden pr-1"
    >
      {match.comment
        ? `"${
            match.comment.length > slice
              ? match.comment.slice(0, slice) + "..."
              : match.comment
          }"`
        : new Date(match.date).toLocaleDateString("de-DE")}
    </div>
  );

  return (
    <div
      className={`flex gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden justify-between max-h-12 outline outline-dashed ${
        isPlayerOne
          ? match.player1.score > match.player2.score
            ? "outline-success"
            : "outline-failure"
          : match.player2.score > match.player1.score
          ? "outline-success"
          : "outline-failure"
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
