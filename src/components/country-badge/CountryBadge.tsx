import React from "react";
import "./country-badge.scss";
import className from "classnames";

interface CountryBadgeProps {
  type: "bg-light" | "bg-dark";
  text: string;
  onClose?: () => void;
}

const CountryBadge: React.FC<CountryBadgeProps> = (props: CountryBadgeProps) => {
  return (
    <span className="country-badge badge bg-secondary">
      {props.text} <button type="button" className={className("btn-close", { "btn-close-white": props.type === "bg-dark" })} onClick={props.onClose} />
    </span>
  );
};

export default CountryBadge;
