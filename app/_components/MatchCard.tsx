import { IMatchData } from "../interfaces";
import { FaCommentDots } from "react-icons/fa";


interface IProps {
  match: IMatchData;
}

export default function MatchCard({ match }: IProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md flex-1 relative hover:outline-2 outline-gray-400 overflow-hidden">
      <div className="flex text-3xl items-center justify-between">
        <div className="flex pr-8 text-gray-300">{match.id}</div>
        <div className="flex gap-3 flex-1">
          <div
            className={
              match.player2.score < match.player1.score ? "text-yellow-500" : ""
            }
          >
            {match.player1.name}
          </div>
          <div className="font-semibold">vs</div>
          <div
            className={
              match.player2.score > match.player1.score ? "text-yellow-500" : ""
            }
          >
            {match.player2.name}
          </div>
        </div>
        <div className="flex items-center font-bold gap-1 justify-center flex-1">
          <div
            className={
              match.player2.score < match.player1.score ? "text-yellow-500" : ""
            }
          >
            {match.player1.score}
          </div>

          <div>-</div>
          <div
            className={
              match.player2.score > match.player1.score ? "text-yellow-500" : ""
            }
          >
            {match.player2.score}
          </div>
        </div>
        <div className=" flex text-lg text-gray-500 justify-end flex-1">
          {new Date(match.date).toLocaleString("de-DE")}
        </div>
       {match.comment && <FaCommentDots className="pl-2 hover:text-gray-400"  title={match.comment}/>}
      </div>
    </div>
  );
}
