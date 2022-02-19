import React from "react";
import "./sidebar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { useThemeContext } from "../../context/ThemeContext";
import { useOnOutsideClick } from "../../hooks/outsideCLick";
import CountryCard from "../countryCard/CountryCard";
import axios from "axios";

interface CountryDetails {
  timeZone: string;
  label: string;
  searchLabel: string;
}

export const Sidebar = () => {
  const { theme } = useThemeContext();
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
  const [countries, setCountries] = React.useState<CountryDetails[]>();
  const [newCountries, setNewCountries] = React.useState<CountryDetails[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [countryNameInput, setCountryNameInput] = React.useState<string>("");

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const countryNameLabels = (data: string[]) => {
    const countryNames: string[] = [...data];
    let newCountryNames: any = [];

    countryNames.map((value: string) =>
      newCountryNames.push({
        timeZone: value,
        label: value.replaceAll("/", ", ").replaceAll("_", " "),
        searchLabel: value.replaceAll("/", " ").replaceAll("_", " "),
      })
    );
    setNewCountries(newCountryNames);
    setCountries(newCountryNames);
  };

  const sidebarRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
  useOnOutsideClick(sidebarRef, () => setOpenSidebar(false));

  const countryNameInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryNameInput(event.target.value);
    filterCountryName(event.target.value);
  };

  const filterCountryName = (name: string) => {
    setNewCountries(countries?.filter((value: CountryDetails) => value.searchLabel.toLowerCase().includes(name.toLowerCase())));
  };

  React.useEffect(() => {
    axios
      .get("countryTimeZone.json")
      .then((res) => {
        countryNameLabels(res.data.allTimeZone);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const countryBodyContent = () => {
    if (isLoading) {
      return <label htmlFor="">Loading</label>;
    }
    return (
      <div className="country-card-container row">
        {newCountries?.map((value: CountryDetails, index: number) => (
          <div key={index} className="col-sm-12">
            <CountryCard countryName={value.label} timeZone={value.timeZone} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </div>
      <div className={`sidebar-content ${openSidebar ? "open-sidebar" : ""} ${theme.nav}`}>
        <label className="mb-3">Search prefable country</label>
        <form className="w-100 mb-3" onSubmit={onSubmit}>
          <input
            type="text"
            className={`form-control ${theme.nav} ${theme.text} size-sm`}
            value={countryNameInput}
            onChange={countryNameInputOnChange}
            placeholder="Eg: Hawaili"
            disabled={isLoading}
          />
        </form>
        {openSidebar && countryBodyContent()}
      </div>
    </div>
  );
};

export default Sidebar;
