import React, { createContext, PropsWithChildren, useContext, useState } from "react";

type ITextTheme = "text-light" | "text-dark";
type IBodyTheme = "bg-light" | "bg-white" | "body-dark" | "bg-dark";
type ICardTheme = "country-card-bg-light" | "country-card-bg-dark";

interface ITheme {
  bgBody: IBodyTheme;
  text: ITextTheme;
  nav: IBodyTheme;
  card: IBodyTheme;
  countryCard: ICardTheme;
}

interface IContextType {
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<ITheme>>;
}

const ThemeContext: React.Context<IContextType> = createContext<IContextType>({} as IContextType);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState<ITheme>({
    bgBody: "bg-light",
    text: "text-dark",
    nav: "bg-light",
    card: "bg-white",
    countryCard: "country-card-bg-light",
  });

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
