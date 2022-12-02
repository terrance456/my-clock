import React from "react";
import { useLocalStorage } from "../../hooks/sessionStorage";
import { firstRowTimeZone, secondRowTimeZone, thirdRowTimeZone } from "../../mocks/TimeZone";
import ClockList, { ClockListRowType } from "../ClockList/ClockList";
import "./home.scss";

export const Home = () => {
  const [list, setList] = React.useState<ClockListRowType>();
  const { sessionData, storeData } = useLocalStorage("preference-clock-list", true);

  React.useEffect(() => {
    if (sessionData) {
      setList(sessionData as ClockListRowType);
      return;
    }
    setList({ firstRow: firstRowTimeZone, secondRow: secondRowTimeZone, thirdRow: thirdRowTimeZone });
  }, [sessionData]);

  return <ClockList list={list} />;
};

export default Home;
