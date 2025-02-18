import Link from "next/link";
import React, { Fragment } from "react";
import { IResult } from "../interfaces";
import { _AnimatedNumber } from "./_AnimatedNumbers";

interface IProps {
  label: string ;
  content?: React.ReactNode;
  result?: IResult;
}

export default function StatisticCard({  result, label, content }: IProps) {
  return (
    <div
      title={result?.name.join(",")}
      className="flex flex-col gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden"
    >
      <div className="flex">
        <div className="text-normal grow p-2 md:p-2 md:px-5 whitespace-nowrap flex-1 overflow-hidden">
          {label}
        </div>
        <div className="flex text-normal secondary font-semibold flex-1 px-4 md:px-5 items-center relative justify-between">
          <div className="flex secondary px-4 skew-x-16 absolute -left-4 top-0 bottom-0" />
          {result ? (
            <>
              <div className="flex max-w-40 overflow-hidden">
                {result.name.map((n, i) => (
                  <Fragment key={n + result.num + i}>
                    {i > 0 && ","}
                    <Link
                      title={n}
                      key={n + "_mw"}
                      href={`/${n}`}
                      passHref
                      className={`hover:underline ${i != 0 && "pl-2"}`}
                    >
                      {result.name.length > 1 ? n.substring(0, 3) : n}
                    </Link>
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
