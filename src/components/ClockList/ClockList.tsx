import React from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { ITimeZone } from "../../mocks/TimeZone";
import Clock from "../clock/Clock";

export interface ClockListRowType {
  firstRow: ITimeZone[];
  secondRow: ITimeZone[];
  thirdRow: ITimeZone[];
}

interface ClockListProps {
  list: ClockListRowType | undefined;
}

const ClockList: React.FC<ClockListProps> = ({ list }) => {
  const { theme } = useThemeContext();

  return (
    <div className={`container-fluid p-2 h-100 ${theme.bgBody} my-home-container`}>
      <div className="container my-home">
        <div className="row gap-lg-4 gap-0 justify-content-center mb-my-0 my-3 ">
          <div className="row">
            {list?.firstRow?.map((value: ITimeZone, index: number) => (
              <div className="col-lg-4 col-12 mb-4 mb-lg-0" key={index}>
                <Clock timeZone={value.timeZone} label={value.label} />
              </div>
            ))}
          </div>
          <div className="row">
            {list?.secondRow?.map((value: ITimeZone, index: number) => (
              <div className="col-lg-6 col-12 mb-4 mb-lg-0" key={index}>
                <Clock timeZone={value.timeZone} label={value.label} />
              </div>
            ))}
          </div>
          <div className="row">
            {list?.thirdRow?.map((value: ITimeZone, index: number) => (
              <div className="col" key={index}>
                <Clock timeZone={value.timeZone} label={value.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockList;