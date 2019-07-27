import React, { useState } from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/core";
import { ThemeProvider, withTheme } from "emotion-theming";

import Buttons from "./ui/Buttons";
import themes from "./theme/themes";

// use HOC here since we want the theme to be passed in as prop not context
const ButtonsWithTheme = withTheme(Buttons);

function App() {
  const [theme, setTheme] = useState(themes.light);

  return (
    <ThemeProvider theme={theme}>
      <ButtonsWithTheme setTheme={setTheme} />
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
