import React, { PropsWithChildren } from "react";
import { IClockProps } from "../components/clock/Clock";
import TimeModal from "../components/timeModal/TimeModal";

interface TimeModalContextReturnType {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeDetails: React.Dispatch<React.SetStateAction<IClockProps>>;
  timeDetails: IClockProps;
}

export const TimeModalContext: React.Context<TimeModalContextReturnType> = React.createContext({} as TimeModalContextReturnType);

export const useTimeModalContext = () => {
  return React.useContext(TimeModalContext);
};

export const TimeModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);
  const [timeDetails, setTimeDetails] = React.useState<IClockProps>({});

  return (
    <TimeModalContext.Provider value={{ setToggleModal, setTimeDetails, timeDetails }}>
      {children}
      {toggleModal && <TimeModal />}
    </TimeModalContext.Provider>
  );
};
