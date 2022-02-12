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
      className={`container-fluid p-2 h-100 ${theme.bgBody} my-home-container`}
    >
      <div className="container my-home">
        <div className="row gap-lg-4 gap-0 justify-content-center">
          <div className="row">
            {firstRowTimeZone.map((value: ITimeZone, index: number) => (
              <div className="col-lg-4 col-12 mb-4 mb-lg-0" key={index}>
                <Clock timeZone={value.timeZone} label={value.label} />
              </div>
            ))}
          </div>
          <div className="row">
            {secondRowTimeZone.map((value: ITimeZone, index: number) => (
              <div className="col-lg-6 col-12 mb-4 mb-lg-0" key={index}>
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
