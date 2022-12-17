import React from "react";
import { ClockListRowType } from "../components/ClockList/ClockList";

export function useLocalStorage<T extends ClockListRowType | string>(key: string, isJSON: boolean = false) {
  const [localStorageData, setLocalStorageData] = React.useState<T>();

  const storeData = (data: T) => {
    window.localStorage.setItem(key, isJSON ? JSON.stringify(data) : (data as string));
    setLocalStorageData(data);
  };

  const removeLocalStorage = () => {
    setLocalStorageData(undefined);
    window.localStorage.removeItem(key);
  };

  React.useEffect(() => {
    if (window.localStorage.getItem(key)) {
      setLocalStorageData(isJSON ? JSON.parse(window.localStorage.getItem(key) as string) : window.localStorage.getItem(key));
      return;
    }
    setLocalStorageData(undefined);
  }, [key, isJSON]);

  return { storeData, localStorageData, removeLocalStorage };
}
