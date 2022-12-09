import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { timeConverter } from "../../helperFunctions/helperFunction";
import "./clock.scss";

export interface IClockProps {
  timeZone?: string;
  label?: string;
}

export const Clock = (props: IClockProps) => {
  const { theme } = useThemeContext();
  const [timeDisplay, setTimeDisplay] = useState<string>("--:--:-- PM");

  useEffect(() => {
    const tickEverySecond: NodeJS.Timer = setInterval(() => setTimeDisplay(timeConverter(new Date(), props.timeZone as string)), 1000);
    return () => clearInterval(tickEverySecond);
  }, [props]);

  return (
    <div className={`card d-flex justify-content-center ${theme.card} ${theme.text} align-items-center shadow clock-card `}>
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h1 className="my-time mb-0">{timeDisplay}</h1>
        <label htmlFor="">{props.label}</label>
      </div>
    </div>
  );
};

export default Clock;
