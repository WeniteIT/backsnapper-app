import React from "react";
import { GiPickle } from "react-icons/gi";
import {
  TbHexagonLetterA,
  TbHexagonLetterAFilled,
  TbHexagonLetterB,
  TbHexagonLetterBFilled,
  TbHexagonLetterC,
  TbHexagonLetterCFilled,
} from "react-icons/tb";

interface ILeague {
  title: string;
  icon: React.ReactNode;
  requiredScore: number;
  className: string;
}

export const LeagueInfoTitle = `SS+-League: 1550\n SS-League: 1500\n S+-League: 1450\n S-League: 1400\n A+-Legaue: 1350\n A-League: 1300\n B+-League: 1250\n B-League: 1200\n C+-League: 1150\n C-League: 1100\n Cucumber-League: below 1100`;

export function getLeague(score: number): ILeague {
  const leages = [
    {
      title: "A+-League",
      icon: (
        <TbHexagonLetterAFilled
          className="text-biig text-gold"
          title={"A+-League"}
        />
      ),
      requiredScore: 1350,
      className: "text-gold",
    },
    {
      title: "A-League",
      icon: (
        <TbHexagonLetterA className="text-biig text-gold" title="A-League" />
      ),

      requiredScore: 1300,
      className: "text-gold",
    },
    {
      title: "B+-League",
      icon: (
        <TbHexagonLetterBFilled
          className="text-biig text-silver"
          title="B+-League"
        />
      ),
      requiredScore: 1250,
      className: "text-silver",
    },
    {
      title: "B-League",
      icon: (
        <TbHexagonLetterB className="text-biig text-silver" title="B-League" />
      ),
      requiredScore: 1200,
      className: "text-silver",
    },
    {
      title: "C+-League",
      icon: (
        <TbHexagonLetterCFilled
          className="text-biig text-bronze"
          title="C+-League"
        />
      ),
      requiredScore: 1150,
      className: "text-bronze",
    },
    {
      title: "C-League",
      icon: (
        <TbHexagonLetterC className="text-biig text-bronze" title="C-League" />
      ),
      requiredScore: 1100,
      className: "text-bronze",
    },
    {
      title: "Cucumber-League",
      icon: (
        <GiPickle className="text-biig text-success" title="Cucumber-League" />
      ),
      requiredScore: 0,
      className: "text-success",
    },
  ];
  return (
    leages.find((l) => score >= l.requiredScore) || leages[leages.length - 1]
  );
}
