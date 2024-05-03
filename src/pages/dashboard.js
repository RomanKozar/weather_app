import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../services/weatherSlice";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { useGetForecastWeatherQuery } from "../services/weatherApi";
import Moment from "react-moment";
import useGeoLocation from "../hooks/useGeolocation";
import WeatherChart from "../components/Chart";
import TodaysOverview from "../components/TodaysOverview";
import SearchBar from "../components/Searchbar";
import ThreeDayForecast from "../components/ThreeDayForecast";
import Loader from "../components/Loader";

const Dashboard = () => {
  
  const getGeoLocation = useGeoLocation();
  const isLoadingLocation = getGeoLocation.loaded;
  const locationState = useSelector((state) => state.weatherState);
  const { data, isFetching } = useGetForecastWeatherQuery("New York");
  const dispatch = useDispatch();

  const current = data?.current;
  const forecast = data?.forecast?.forecastday;
  const location = data?.location;
  const dateToFormat = location?.localtime;

  console.log(data);

  return <div>fgghfh</div>;
};

export default Dashboard;
