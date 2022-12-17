import axios, { AxiosResponse } from "axios";
import React from "react";
import { ClockListRowType } from "../components/ClockList/ClockList";
import { useLocalStorage } from "../hooks/localStorage";
import { firstRowTimeZone, secondRowTimeZone, thirdRowTimeZone } from "../mocks/TimeZone";

interface GlobalSettingContextReturnType {
  countryList: string[];
  isFetchingCountryList: boolean;
  defaultHomeTimezone: ClockListRowType;
  storeHomeTimezoneData: (data: string | ClockListRowType) => void;
  localStorageData: ClockListRowType;
  removeLocalStorage: () => void;
}

const GlobalSettingContext = React.createContext<GlobalSettingContextReturnType>({} as GlobalSettingContextReturnType);

export const useGlobalSettingContext = () => {
  return React.useContext(GlobalSettingContext);
};

export const GlobalSettingProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [countryList, setCountryList] = React.useState<string[]>([]);
  const [isFetchingCountryList, setIsFetchingCountryList] = React.useState<boolean>(true);
  const [defaultHomeTimezone, setDefaultHomeTimezone] = React.useState<ClockListRowType>({ firstRow: firstRowTimeZone, secondRow: secondRowTimeZone, thirdRow: thirdRowTimeZone });

  const { localStorageData, storeData, removeLocalStorage } = useLocalStorage("preference-clock-list", true);

  React.useEffect(() => {
    axios
      .get("countryTimeZone.json")
      .then((res: AxiosResponse<any>) => {
        setCountryList(res.data.allTimeZone);
      })
      .finally(() => setIsFetchingCountryList(false));
  }, []);

  React.useEffect(() => {
    if (localStorageData) {
      setDefaultHomeTimezone(localStorageData as ClockListRowType);
      return;
    }
    setDefaultHomeTimezone({ firstRow: firstRowTimeZone, secondRow: secondRowTimeZone, thirdRow: thirdRowTimeZone });
  }, [localStorageData]);

  return (
    <GlobalSettingContext.Provider
      value={{
        countryList,
        isFetchingCountryList,
        defaultHomeTimezone,
        storeHomeTimezoneData: storeData,
        localStorageData: localStorageData as ClockListRowType,
        removeLocalStorage,
      }}
    >
      {children}
    </GlobalSettingContext.Provider>
  );
};
