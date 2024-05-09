import React from "react";
import { Box } from "@mui/material";
import ThreeDayForecast from "./ThreeDayForecast";
import { useGetForecastWeatherQuery } from "../services/weatherApi";

const WeatherComponent = () => {
  const { data, error, isLoading } = useGetForecastWeatherQuery();
  const forecast = data?.forecast?.forecastday;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box p={4}>
      <ThreeDayForecast forecast={forecast} />
    </Box>
  );
};

export default WeatherComponent;