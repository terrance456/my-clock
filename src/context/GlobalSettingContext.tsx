import axios, { AxiosResponse } from "axios";
import React from "react";

interface GlobalSettingContextReturnType {
  countryList: string[];
  isFetchingCountryList: boolean;
}

const GlobalSettingContext = React.createContext<GlobalSettingContextReturnType>({} as GlobalSettingContextReturnType);

export const useGlobalSettingContext = () => {
  return React.useContext(GlobalSettingContext);
};

export const GlobalSettingProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [countryList, setCountryList] = React.useState<string[]>([]);
  const [isFetchingCountryList, setIsFetchingCountryList] = React.useState<boolean>(true);

  React.useEffect(() => {
    axios
      .get("countryTimeZone.json")
      .then((res: AxiosResponse<any>) => {
        setCountryList(res.data.allTimeZone);
      })
      .finally(() => setIsFetchingCountryList(false));
  }, []);

  return <GlobalSettingContext.Provider value={{ countryList, isFetchingCountryList }}>{children}</GlobalSettingContext.Provider>;
};
