import React from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { GoGlobe } from "react-icons/go";
import "./country-card.scss";
import { useTimeModalContext } from "../../context/TimeModalContext";

interface CountryCardProps {
  countryName?: string;
  timeZone?: string;
}

export const CountryCard: React.FC<CountryCardProps> = ({ countryName, timeZone }: CountryCardProps) => {
  const { theme } = useThemeContext();
  const { setToggleModal, setTimeDetails } = useTimeModalContext();

  const onClickCard = () => {
    setToggleModal(true);
    setTimeDetails({ label: countryName, timeZone });
  };

  return (
    <div className={`card ${theme.countryCard} country-card col-12`} onClick={onClickCard}>
      <div className="card-body ">
        <div className="row d-flex align-items-center">
          <div className="col-2">
            <GoGlobe />
          </div>
          <div className="col-10">{countryName}</div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
