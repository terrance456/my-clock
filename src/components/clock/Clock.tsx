import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import "./clock.scss";

interface IClockProps {
  timeZone?: string;
  label?: string;
}

export const Clock = (props: IClockProps) => {
  const { theme } = useThemeContext();
  const [timeDisplay, setTimeDisplay] = useState<string>("--:--:-- PM");

  const timeConveter = (date: Date, timeZone: string) => {
    return new Date(date).toLocaleTimeString("en-US", { timeZone: timeZone });
  };

  useEffect(() => {
    const tickEverySecond: NodeJS.Timer = setInterval(
      () => setTimeDisplay(timeConveter(new Date(), props.timeZone as string)),
      1000
    );
    return () => clearInterval(tickEverySecond);
  });

  return (
    <div
      className={`card  d-flex justify-content-center ${theme.card} ${theme.text} align-items-center shadow`}
    >
      <div className="card-body p-5 d-flex flex-column align-items-center">
        <h1 className="my-time mb-0">{timeDisplay}</h1>
        <label htmlFor="">{props.label}</label>
      </div>
    </div>
  );
};

export default Clock;
