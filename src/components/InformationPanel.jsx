import React from "react";
import { Box, Typography, Grid, Stack, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import "swiper/css";

const InformationPanel = ({ current, forecast }) => {
  const fahrenheit = useSelector((state) => state.weatherState.fahrenheit);

  const todaysOverviewItems = [
    {
      item: "High",
      value: fahrenheit
        ? `${forecast?.[0].day.maxtemp_c}°C`
        : `${forecast?.[0].day.maxtemp_f}°F`,
    },
    {
      item: "Low",
      value: fahrenheit
        ? `${forecast?.[0].day.mintemp_c}°C`
        : `${forecast?.[0].day.mintemp_f}°F`,
    },
    { item: "Wind", value: `${current?.wind_mph}mph` },
    { item: "Rain", value: `${forecast?.[0]?.day?.daily_chance_of_rain}%` },
    { item: "Pressure", value: `${current?.pressure_in}in` },
    { item: "Humidity", value: `${current?.uv}` },
  ];
  return (
    <Box>
      <Grid
        sx={{ paddingTop: "18px" }}
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
        alignItems="center"
      >
        {todaysOverviewItems.map(({ item, value }) => (
          <Grid item key={item}>
            <Paper
              sx={{
                // backgroundColor: Colors.grey,
                padding: "2rem",
                width: 50,
                height: 50,
              }}
              elevation={0}
            >
              <Stack>
                <Typography
                  color="secondary.dark"
                  variant="subtitle2"
                  sx={{ fontSize: "16px" }}
                >
                  {" "}
                  {item}{" "}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontSize: "21px" }}>
                  {" "}
                  {value}{" "}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InformationPanel;
