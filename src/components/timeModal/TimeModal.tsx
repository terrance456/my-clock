import { useTimeModalContext } from "../../context/TimeModalContext";
import Clock from "../clock/Clock";
import "./time-modal.scss";

export const TimeModal = () => {
  const { timeDetails, setToggleModal } = useTimeModalContext();

  return (
    <div className="time-modal">
      <div className="time-modal-backdrop" onClick={() => setToggleModal(false)} />
      <div className="time-modal-content ">
        <Clock label={timeDetails.label} timeZone={timeDetails.timeZone} />
        <button className="btn btn-outline-primary" onClick={() => setToggleModal(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default TimeModal;
