import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/style.scss";

//import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "Routes/AppRouter";
import { ThemeProvider, createTheme } from "@mui/material";
import { blue, pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
    // primary: {
    //   light: "#757ce8",
    //   main: "#3f50b5",
    //   dark: "#002884",
    //   contrastText: "#fff",
    // },
    // secondary: {
    //   light: "#ff7961",
    //   main: "#f44336",
    //   dark: "#ba000d",
    //   contrastText: "#000",
    // },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </ThemeProvider>

  //</React.StrictMode>
);

reportWebVitals();
