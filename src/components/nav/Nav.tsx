import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import "./nav.scss";
import Sidebar from "../sidebar/Sidebar";

const Nav = () => {
  const { theme, setTheme } = useThemeContext();
  const [checkedBox, setcheckedBox] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "dark") {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    } else {
      localStorage.setItem("theme", "light");
      console.log("empty");
    }
  }, []);

  const setDarkTheme = () => {
    setTheme({
      bgBody: "body-dark",
      text: "text-light",
      nav: "bg-dark",
      card: "bg-dark",
      countryCard: "country-card-bg-dark",
    });
    setcheckedBox(true);
    localStorage.setItem("theme", "dark");
  };

  const setLightTheme = () => {
    setTheme({
      bgBody: "bg-light",
      text: "text-dark",
      nav: "bg-light",
      card: "bg-white",
      countryCard: "country-card-bg-light",
    });
    setcheckedBox(false);
    localStorage.setItem("theme", "light");
  };

  const toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.checked ? setDarkTheme() : setLightTheme();
  };

  return (
    <nav className={`navbar navbar-expand-lg px-3 ${theme.nav} ${theme.text}`}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <div className="row align-items-center ">
            <div className="col d-flex flex-column">
              <h2 className="mb-0">Clocky</h2>
              <small>keep time in control</small>
            </div>
          </div>
        </div>
        <div className="nav-tools">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={toggle} checked={checkedBox} />
            <label className={`form-check-label ${theme.text}`} htmlFor="flexSwitchCheckDefault">
              Theme mode
            </label>
          </div>
          <Sidebar />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
