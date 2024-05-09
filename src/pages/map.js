import React, { useEffect } from "react";
import Mapbox from "../components/Mapbox";
import { Box, Stack } from "@mui/material";
import useGeoLocation from "../hooks/useGeoLocation";
import { setLocation } from "../services/weatherSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetForecastWeatherQuery } from "../services/weatherApi";
import Loader from "../components/Loader";
import ThreeDayForecast from "../components/ThreeDayForecast";
import InformationPanel from "../components/InformationPanel";

const Map = () => {
  const getGeoLocation = useGeoLocation();
  const isLoadingLocation = getGeoLocation.loaded;

  const locationState = useSelector((state) => state.weatherState.location);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetForecastWeatherQuery(locationState);
  const location = data?.location;
  const current = data?.current;
  const forecast = data?.forecast?.forecastday;

  useEffect(() => {
    let currentLocation = "";
    if (locationState) {
      currentLocation = locationState;
    } else if (getGeoLocation?.loaded)
      currentLocation = [
        getGeoLocation?.coordinates.lat,
        getGeoLocation?.coordinates.lng,
      ];

    dispatch(setLocation(currentLocation));
    // eslint-disable-next-line
  }, [getGeoLocation]);

  console.log(location);

  if (isFetching || !isLoadingLocation)
    return (
      <>
        {" "}
        <Loader />{" "}
      </>
    );

  return (
    <Box>
      <Stack spacing={2}>
        <Mapbox location={location} current={current} />
      </Stack>
      <ThreeDayForecast forecast={forecast} />
      <InformationPanel forecast={forecast} current={current} />
    </Box>
  );
};

export default Map;
