import React from "react";
import PreferenceSettingModal from "../components/PreferenceSettingModal/PreferenceSettingModal";

interface PreferenceSettingContextReturnType {
  toggleSettingModal: (toggle: boolean) => void;
}

export const PreferenceSettingContext = React.createContext<PreferenceSettingContextReturnType>({} as PreferenceSettingContextReturnType);

export const usePreferenceSettingContext = () => {
  return React.useContext(PreferenceSettingContext);
};

export const PreferenceSettingProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [settingModalToggle, setSettingModalToggle] = React.useState<boolean>(false);

  const toggleSettingModal = (toggle: boolean) => {
    setSettingModalToggle(toggle);
  };

  return (
    <PreferenceSettingContext.Provider value={{ toggleSettingModal }}>
      {settingModalToggle && <PreferenceSettingModal toggle={settingModalToggle} onModalClose={() => setSettingModalToggle(false)} />}
      {children}
    </PreferenceSettingContext.Provider>
  );
};
