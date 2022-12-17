import React from "react";
import "./sidebar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { useThemeContext } from "../../context/ThemeContext";
import { useOnOutsideClick } from "../../hooks/outsideCLick";
import CountryCard from "../countryCard/CountryCard";
import { formatDataCountryLabels, splitDataIntoChunks } from "../../utils";
import { DetectScrollEnd } from "../../hooks/detectScrollEnd";
import { useGlobalSettingContext } from "../../context/GlobalSettingContext";
import { CountryDetails } from "../../types/CountryDetails.type";
import classNames from "classnames";

export const Sidebar = () => {
  const { theme } = useThemeContext();
  const { countryList, isFetchingCountryList } = useGlobalSettingContext();
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
  const [countries, setCountries] = React.useState<CountryDetails[]>([]);
  const [newCountries, setNewCountries] = React.useState<CountryDetails[]>([]);
  const [splitData, setSplitData] = React.useState<Array<any>>([]);
  const [countryNameInput, setCountryNameInput] = React.useState<string>("");
  const sideBarScrollRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
  const [scrollCount, setScrollCount] = React.useState<number>(1);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
    !openSidebar && setScrollCount(1);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const sidebarRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const closeSidebar = (event: MouseEvent) => {
    if (!document.querySelector(".time-modal")?.contains(event.target as HTMLElement)) {
      setOpenSidebar(false);
      setScrollCount(1);
    }
  };

  useOnOutsideClick(sidebarRef, closeSidebar);

  const countryNameInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryNameInput(event.target.value);
    if (event.target.value === "") {
      setNewCountries(splitData[0]);
      setScrollCount(1);
    } else {
      filterCountryName(event.target.value);
    }
  };

  const filterCountryName = (name: string) => {
    setNewCountries(countries?.filter((value: CountryDetails) => value.searchLabel.toLowerCase().includes(name.toLowerCase())));
  };

  const loadOnScroll = () => {
    if (newCountries?.length <= countries?.length && scrollCount < splitData.length) {
      const newData: CountryDetails[] = newCountries?.concat(splitData[scrollCount]) as CountryDetails[];
      setNewCountries(newData);
      setScrollCount(scrollCount + 1);
    }
  };

  DetectScrollEnd(sideBarScrollRef, loadOnScroll);

  React.useEffect(() => {
    if (!openSidebar) {
      setCountryNameInput("");
      setCountries([]);
      setNewCountries([]);
      setSplitData([]);
    } else {
      setCountries(formatDataCountryLabels(countryList));
      setSplitData(splitDataIntoChunks(countryList, 20));
      setNewCountries(splitDataIntoChunks(countryList, 20)[0]);
    }
  }, [openSidebar, countryList]);

  const countryBodyContent = () => {
    if (isFetchingCountryList) {
      return <label htmlFor="">Loading</label>;
    }
    return (
      <div className="country-card-container row" ref={sideBarScrollRef}>
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
      <div className={classNames("sidebar-content", { "open-sidebar": openSidebar }, theme.nav)}>
        <label className="mb-3">Search prefable timezone</label>
        <form className="w-100 mb-3" onSubmit={onSubmit}>
          <input
            type="text"
            className={classNames("form-control size-sm", theme.nav, theme.text)}
            value={countryNameInput}
            onChange={countryNameInputOnChange}
            placeholder="Eg: Kuala Lumpur"
            disabled={isFetchingCountryList}
          />
        </form>
        {openSidebar && countryBodyContent()}
      </div>
    </div>
  );
};

export default Sidebar;
