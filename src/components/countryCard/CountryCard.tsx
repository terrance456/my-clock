import React from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { FcGlobe } from "react-icons/fc";
import "./country-card.scss";
import { timeConverter } from "../../helperFunctions/helperFunction";

interface CountryCardProps {
  countryName?: string;
  timeZone?: string;
}

export const CountryCard: React.FC<CountryCardProps> = ({ countryName, timeZone }: CountryCardProps) => {
  const { theme } = useThemeContext();

  const onClickCard = () => {
    console.log(timeConverter(new Date(), timeZone as string));
  };

  return (
    <div className={`card ${theme.countryCard} country-card col-12`} onClick={onClickCard}>
      <div className="card-body ">
        <div className="row d-flex align-items-center">
          <div className="col-2">
            <FcGlobe />
          </div>
          <div className="col-10">{countryName}</div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
