import React from "react";
import { useState, useContext, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AuthUser from "./context";
import { AiFillHome } from "react-icons/ai";

const useStyles = makeStyles(() => {
  return {
    nav: {
      backgroundColor: "#FF6209",
    },
    avatar: {
      marginRight: 20,
    },
    text: {
      fontFamily: "Heebo",
      fontWeight: "500",
      fontSize: 25,
      color: "black",
      flexGrow: 1,
    },
  };
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "12ch",
      "&:focus": {
        width: "15ch",
      },
    },
  },
}));

const Navbar = () => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const ctx = useContext(AuthUser);
  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.setLoading(true);
    ctx.setLocation(search);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search.trim()}&appid=3b151a4a12258e1945dbc93df47ba3a6`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.cod !== "404") {
          const arr = [];
          for (let i = 0; i < data.list.length; i += 8) {
            arr.push({
              icon: data.list[i].weather[0].icon,
              humidity: data.list[i].main.humidity,
              windSpeed: data.list[i].wind.speed,
              description: data.list[i].weather[0].description,
              date: data.list[i].dt_txt,
              maxTemp: data.list[i].main.temp_max,
              minTemp: data.list[i].main.temp_min,
              type: data.list[i].sys.pod,
            });
          }
          ctx.setWeatherData(arr);
          ctx.setLoading(false);
          setSearch("");
        } else {
          ctx.setWeatherData(false);
          ctx.setLoading(false);
          setSearch("");
        }
      })
      .catch((err) => {
        ctx.setWeatherData(false);
        ctx.setLoading(false);
      });
  };
  return (
    <>
      <AppBar className={classes.nav} elevation={1}>
        <Toolbar className={classes.nav}>
          <Avatar
            variant="square"
            src="/rainy-day.png"
            sx={{ width: 40, height: 40 }}
            className={classes.avatar}
          />
          <Typography className={classes.text}></Typography>
          <form onSubmit={submitHandler}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Enter a City"
                onChange={searchChangeHandler}
                value={search}
              />
              <AiFillHome
                style={{ marginRight: 10 }}
                onClick={() => ctx.setReset(!ctx.reset)}
              />
            </Search>
          </form>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
