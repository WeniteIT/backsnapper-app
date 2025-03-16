import React, { Fragment } from "react";
import { IResult } from "../interfaces";
import { PlayerLink } from "./PlayerLink";
import { _AnimatedNumber } from "./_AnimatedNumbers";

interface IProps {
  label: string | React.ReactNode;
  content?: React.ReactNode;
  result?: IResult;
}

export default function StatisticCard({ result, label, content }: IProps) {
  return (
    <div
      title={result?.name?.join(",")}
      className="flex flex-col gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden"
    >
      <div className="flex">
        <div className="text-normal grow p-2 md:p-2 md:px-5 whitespace-nowrap flex-1 overflow-hidden">
          {label}
        </div>
        <div className="flex text-normal secondary font-medium flex-1 pl-2 pr-4 md:pr-5 items-center relative justify-between">
          <div className="flex secondary px-2 skew-x-16 absolute -left-2 top-0 bottom-0" />
          {result ? (
            <>
              <div className="flex max-w-40 overflow-hidden">
                {result.name?.map((n, i) => (
                  <Fragment key={n + result.num + i}>
                    {i > 0 && ","}
                    <PlayerLink
                      name={n}
                      className={i !== 0 ? "pl-2" : ""}
                      shorten={result.name.length > 1}
                    />
                  </Fragment>
                ))}
              </div>
              <_AnimatedNumber num={result.num} />
            </>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}
