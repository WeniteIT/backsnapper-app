import { IMatchData } from "../interfaces";
import BaseCard from "./BaseCard";

interface IProps {
  match: IMatchData;
}

export default function MatchCard({ match }: IProps) {
  return (
    <BaseCard>
      <div className="flex text-4xl items-center justify-between">
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
      </div>
    </BaseCard>
  );
}
