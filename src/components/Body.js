import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { format } from "date-fns";
import { CardHeader, CardMedia } from "@mui/material";
import AuthUser from "./context";
import { display } from "@mui/system";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
const to12Hours = require("to12hours");

const useStyles = makeStyles(() => {
  return {
    cardTop: {
      paddingTop: 50,
    },
    text: {
      fontFamily: "Heebo",
      fontWeight: "500",
      fontSize: 25,
      color: "black",
    },
    card: {
      backgroundColor: "#000191",
    },
    mainTemp: {
      fontFamily: "Heebo",
      fontWeight: "900",
      fontSize: 35,
      color: "black",
    },
    secondTemp: {
      fontFamily: "Heebo",
      fontWeight: "900",
      fontSize: 25,
      color: "black",
    },
  };
});

const Body = () => {
  const ctx = useContext(AuthUser);
  useEffect(() => {
    ctx.setLoading(true);
    ctx.setLocation("mumbai");
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=3b151a4a12258e1945dbc93df47ba3a6`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
      });
  }, [ctx.reset]);
  const classes = useStyles();
  return (
    <>
      {ctx.loading ? (
        <Container maxWidth={"lg"} sx={{ textAlign: "center" }}>
          <Toolbar />
          <Toolbar />
          <Toolbar />
          <Toolbar />
          <Toolbar />
          <CircularProgress style={{ color: "#FF6209" }} />
        </Container>
      ) : (
        <>
          {ctx.weatherData ? (
            <div>
              <Container maxWidth={"lg"}>
                <Toolbar />
                <Toolbar />
                <Grid container justifyContent="center">
                  <Grid item>
                    <Card sx={{ maxWidth: 500 }} elevation={1}>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={6} sm={3}>
                            <img
                              src={`https://openweathermap.org/img/wn/${ctx.weatherData[0].icon}@2x.png`}
                            />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography className={classes.mainTemp}>
                              {(ctx.weatherData[0].maxTemp - 273.15).toFixed(1)}
                              °C
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 20,
                                textAlign: "right",
                              }}
                            >
                              {ctx.location}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 12,
                                textAlign: "right",
                              }}
                            >
                              Report of{" "}
                              {new Date(
                                ctx.weatherData[0].date.substring(0, 10)
                              ).toDateString()}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 12,
                                textAlign: "right",
                              }}
                            >
                              Updated at{" "}
                              {to12Hours(
                                ctx.weatherData[0].date.substring(11, 16)
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          sx={{ paddingTop: 5, textAlign: "center" }}
                        >
                          <Grid item xs={4} sm={4}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 13,
                                paddingBottom: 2,
                              }}
                            >
                              Stats
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 15,
                              }}
                            >
                              {ctx.weatherData[0].description}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sm={4}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 13,
                                paddingBottom: 2,
                              }}
                            >
                              Wind speed
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 15,
                              }}
                            >
                              {(ctx.weatherData[0].windSpeed * 3.6).toFixed(1)}{" "}
                              km/h
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sm={4}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 13,
                                paddingBottom: 2,
                              }}
                            >
                              Humidity
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 15,
                              }}
                            >
                              {ctx.weatherData[0].humidity}%
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container sx={{ paddingTop: 5, paddingBottom: 5 }}>
                  <Grid item sx={{ display: "flex", flexGrow: 1 }}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label="Forecast report"
                        sx={{
                          backgroundColor: "#FF6209",
                          color: "#fff",
                          fontFamily: "Heebo",
                          fontWeight: "500",
                          fontSize: 15,
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontFamily: "Heebo",
                        fontWeight: "500",
                        fontSize: 13,
                        color: "#BABABA",
                      }}
                    >
                      Next 4 days
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent={"center"} spacing={2}>
                  <Grid item sx={{ paddingTop: 5 }} xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                            <img
                              src={`https://openweathermap.org/img/wn/${ctx.weatherData[1].icon}.png`}
                            />
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography className={classes.secondTemp}>
                              {(ctx.weatherData[1].maxTemp - 273.15).toFixed(1)}
                              °C
                            </Typography>
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 15,
                                color: "#FF6209",
                              }}
                            >
                              {ctx.weatherData[1].description}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 12,
                                textAlign: "right",
                              }}
                            >
                              Report of{" "}
                              {new Date(
                                ctx.weatherData[1].date.substring(0, 10)
                              ).toDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sx={{ paddingTop: 5 }} xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                            <img
                              src={`https://openweathermap.org/img/wn/${ctx.weatherData[2].icon}.png`}
                            />
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography className={classes.secondTemp}>
                              {(ctx.weatherData[1].maxTemp - 273.15).toFixed(1)}
                              °C
                            </Typography>
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 15,
                                color: "#FF6209",
                              }}
                            >
                              {ctx.weatherData[2].description}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 12,
                                textAlign: "right",
                              }}
                            >
                              Report of{" "}
                              {new Date(
                                ctx.weatherData[2].date.substring(0, 10)
                              ).toDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sx={{ paddingTop: 5 }} xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                            <img
                              src={`https://openweathermap.org/img/wn/${ctx.weatherData[3].icon}.png`}
                            />
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography className={classes.secondTemp}>
                              {(ctx.weatherData[1].maxTemp - 273.15).toFixed(1)}
                              °C
                            </Typography>
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 15,
                                color: "#FF6209",
                              }}
                            >
                              {ctx.weatherData[3].description}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 12,
                                textAlign: "right",
                              }}
                            >
                              Report of{" "}
                              {new Date(
                                ctx.weatherData[3].date.substring(0, 10)
                              ).toDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sx={{ paddingTop: 5 }} xs={12} md={6} lg={3}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                            <img
                              src={`https://openweathermap.org/img/wn/${ctx.weatherData[4].icon}.png`}
                            />
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography className={classes.secondTemp}>
                              {(ctx.weatherData[1].maxTemp - 273.15).toFixed(1)}
                              °C
                            </Typography>
                          </Grid>
                          <Grid item xs={5} sx={{ textAlign: "center" }}>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "700",
                                fontSize: 15,
                                color: "#FF6209",
                              }}
                            >
                              {ctx.weatherData[4].description}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <Typography
                              sx={{
                                fontFamily: "Heebo",
                                fontWeight: "300",
                                fontSize: 12,
                                textAlign: "right",
                              }}
                            >
                              Report of{" "}
                              {new Date(
                                ctx.weatherData[4].date.substring(0, 10)
                              ).toDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent={"center"}
                  sx={{ paddingTop: 5, textAlign: "center" }}
                >
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "Heebo",
                        fontWeight: "500",
                        fontSize: 35,
                      }}
                    >
                      Weather <span style={{ color: "#FF6209" }}>Feeds</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "Heebo",
                        fontWeight: "300",
                        fontSize: 18,
                      }}
                    >
                      find weather updates for the city you search
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </div>
          ) : (
            <Container maxWidth={"lg"} sx={{ textAlign: "center" }}>
              <Toolbar />
              <Toolbar />
              <img src="/error.png" width="100%" height="100%" />
              <Typography
                sx={{
                  fontFamily: "Heebo",
                  fontWeight: "300",
                  fontSize: 20,
                }}
              >
                Weather Not Found !
              </Typography>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default Body;
