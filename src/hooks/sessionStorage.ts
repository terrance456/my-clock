import React from "react";
import { ClockListRowType } from "../components/ClockList/ClockList";

export function useLocalStorage<T extends ClockListRowType | string>(key: string, isJSON: boolean = false) {
  const [sessionData, setSessionData] = React.useState<T>();

  const storeData = (data: T) => {
    window.localStorage.setItem(key, isJSON ? JSON.stringify(data) : (data as string));
    setSessionData(data);
  };

  React.useEffect(() => {
    if (window.localStorage.getItem(key)) {
      setSessionData(isJSON ? JSON.parse(window.localStorage.getItem(key) as string) : window.localStorage.getItem(key));
      return;
    }
    setSessionData(undefined);
  }, [key, isJSON]);

  return { storeData, sessionData };
}
