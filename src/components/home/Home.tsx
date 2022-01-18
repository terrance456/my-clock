import { useThemeContext } from "../../context/ThemeContext";
import {
  firstRowTimeZone,
  ITimeZone,
  secondRowTimeZone,
  thirdRowTimeZone,
} from "../../mocks/TimeZone";
import Clock from "../clock/Clock";
import "./home.scss";

export const Home = () => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`container-fluid d-flex align-items-center h-100 ${theme.bgBody} my-home-container`}
    >
      <div className="container d-flex align-items-center my-home">
        <div className="row gap-4 justify-content-center">
          <div className="row">
            {firstRowTimeZone.map((value: ITimeZone, index: number) => (
              <div className="col" key={index}>
                <Clock timeZone={value.timeZone} label={value.label} />
              </div>
            ))}
          </div>
          <div className="row">
            {secondRowTimeZone.map((value: ITimeZone, index: number) => (
              <div className="col" key={index}>
                <Clock timeZone={value.timeZone} label={value.label} />
              </div>
            ))}
          </div>
          <div className="row">
            {thirdRowTimeZone.map((value: ITimeZone, index: number) => (
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

export default Home;
