import React from "react";
import "./country-badge.scss";

interface CountryBadgeProps {
  type: "bg-light" | "bg-dark";
  text: string;
  onClose?: () => void;
}

const CountryBadge: React.FC<CountryBadgeProps> = (props: CountryBadgeProps) => {
  return (
    <span className={`country-badge badge bg-secondary `}>
      {props.text} <button type="button" className={`btn-close ${props.type === "bg-dark" ? "btn-close-white" : ""}`} onClick={props.onClose} />
    </span>
  );
};

export default CountryBadge;
