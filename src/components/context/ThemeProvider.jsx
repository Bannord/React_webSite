import { createContext, useState } from "react";

const ThemeContext = createContext({ type: "Light" });

export const ThemeProvider = ({ children }) => {
  const [type, setType] = useState("Light");

  return (
    <ThemeContext.Provider>
      {" "}
      value={{ type, setType }}
      {children};
    </ThemeContext.Provider>
  );
};
