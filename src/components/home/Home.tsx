import React from "react";
import { useGlobalSettingContext } from "../../context/GlobalSettingContext";
import ClockList from "../ClockList/ClockList";
import "./home.scss";

export const Home = () => {
  const { defaultHomeTimezone } = useGlobalSettingContext();

  return <ClockList list={defaultHomeTimezone} />;
};

export default Home;
