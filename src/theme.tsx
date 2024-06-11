import React, { createContext, useContext } from "react";
import { useLocalStorage } from "react-use";
import {
  createGlobalStyle,
  css,
  ThemeProvider as OriginalThemeProvider,
} from "styled-components";

export const GlobalStyles = createGlobalStyle`${css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font};
    line-height: 1.4;
  }

  html {
    background: ${({ theme }) => theme.color("white", "black")};
    color: ${({ theme }) => theme.color("black", "white")};
    height: 100%;
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    height: 100%;
  }

  #root {
    min-height: 100%;
    height: 100%;
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
    text-decoration: none;
  }
`}
`;

const colors = {
  "white": "#ffffff",
  "black": "#0e0e0e",

  "grey": "#cdcdcd",
  "grey.light": "#e8e8e8",
  "grey.dark": "#5a5a5a",
  "grey.very-dark": "#414141",

  "green": "#3dc33d",
  "green.light": "#c8fbc8",

  "yellow": "#f2c138",
  "yellow.light": "#fae9b1",

  "blue": "#25afee",
  "blue.dark": "#092e40",
  "blue.very-dark": "#031822",
} as const;

export type Color = keyof typeof colors;
export const theme = {
  mode: "light",
  font: '"Inter", sans-serif',
  color(lightMode: Color, darkMode?: Color) {
    return this.mode === "dark" && darkMode
      ? colors[darkMode]
      : colors[lightMode];
  },
  zindex: {
    navbar: 100,
  },
};

type Theme = typeof theme;
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const Context = createContext<(newValue: "dark" | "light") => void>(() =>
  console.error("App is not wrapped in a <ThemeProvider>"),
);

export const ThemeProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [themeMode, setThemeMode] = useLocalStorage<"light" | "dark">(
    "theme",
    "light",
  );

  return (
    <Context.Provider value={setThemeMode}>
      <OriginalThemeProvider
        theme={{ ...theme, mode: themeMode === "dark" ? "dark" : "light" }}
      >
        {children}
      </OriginalThemeProvider>
    </Context.Provider>
  );
};

export const useChangeTheme = () => useContext(Context);
