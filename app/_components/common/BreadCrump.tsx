import { PropsWithChildren } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

interface IProps extends PropsWithChildren {
  label: (string | React.ReactNode)[];
}

export default function BreadCrump({ label }: IProps) {
  return (
    <div className="text-lg flex gap-3 items-center px-2">
      {label.map((item, index) => (
        <>
          <div key={index}>{item}</div>
          {index !== label.length - 1 && (
            <FaLongArrowAltRight className="primary-text" />
          )}
        </>
      ))}
    </div>
  );
}
