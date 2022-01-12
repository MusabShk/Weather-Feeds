import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { StyledEngineProvider } from "@mui/material";
import Body from "./components/Body";
import AuthUser from "./components/context";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(true);
  const [location, setLocation] = useState("mumbai");
  const [reset, setReset] = useState(false);
  return (
    <>
      <StyledEngineProvider injectFirst>
        <AuthUser.Provider
          value={{
            location: location,
            setLocation: setLocation,
            loading: loading,
            setLoading: setLoading,
            weatherData: weatherData,
            setWeatherData: setWeatherData,
            reset: reset,
            setReset: setReset,
          }}
        >
          <Navbar />
          <Body />
        </AuthUser.Provider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
