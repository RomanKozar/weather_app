import React, { useState, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
  useControl,
} from "react-map-gl";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Stack, Button } from "@mui/material";
import { setLocation, setSaves, setItemSaved } from "../services/weatherSlice";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const token = (mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9tYWtvemFyIiwiYSI6ImNsdnY5aWg0MTFua3cyaG5uY2VueDBoMW0ifQ.-OfpEbqvb_PZqnlInwYRpQ");

const Mapbox = ({ location, current }) => {
  const lat = location?.lat; //Геопозиція
  const lng = location?.lon;

  // const lat = 48.8521; // Широта //Оленьово
  // const lng = 23.3321; // Довгота

  // const lat = 48.6208; // Широта //Ужгород
  // const lng = 22.2879; // Довгота

  const [viewState, setViewState] = useState({
    longitude: lng,
    latitude: lat,
    zoom: 9,
  });

  const [showPopup, setShowPopup] = useState(false);

  const fahrenheit = useSelector((state) => state.weatherState.fahrenheit);
  const dispatch = useDispatch();
  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      ref.trigger();
    }
  }, []);

  const Geocoder = () => {
    const geoMap = new MapBoxGeocoder({
      accessToken: token,
      maker: false,
      collapsed: true,
    });
    useControl(() => geoMap);
    geoMap.on("result", (e) => {
      dispatch(setLocation(e.result.text));
    });
  };

  const savedItems = JSON.parse(localStorage.getItem("savedItems"));
  const saves = useSelector((state) => state.weatherState.saves);
  const savedToLocal = useSelector((state) => state.weatherState.itemSaved);

  useEffect(() => {
    dispatch(setSaves(savedItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSaves = (item) => {
    let itemList = [...saves];
    let addArray = true;
    for (let i = 0; i < saves.length; i++) {
      if (saves[i].name === item.name) {
        itemList.splice(i, 1);
        addArray = false;
      }
    }
    if (addArray) {
      itemList.push(item);
    }
    dispatch(setSaves([...itemList]));
  };

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(saves));
    if (savedItems) {
      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].name === location.name) {
          dispatch(setItemSaved(true));
          break;
        } else if (savedItems[i].id !== location.name) {
          dispatch(setItemSaved(false));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedItems]);

  return (
    <>
      <Map
        {...viewState}
        style={{ width: "50", height: "60vh" }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={token}
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Stack
            justifyContent="center"
            alignItems="center"
            onClick={() => setShowPopup(true)}
          >
            <img
              className="mapbox-img"
              src={current ? current?.condition.icon : ""}
              alt="weather-logo"
            />
            <Typography color="primary" variant="h6">
              {fahrenheit ? `${current?.temp_c}°C` : `${current?.temp_f}°F`}
            </Typography>
          </Stack>
        </Marker>

        <Geocoder />
        <GeolocateControl position="bottom-right" ref={geolocateControlRef} />
        <NavigationControl position="bottom-right" />
        {showPopup && (
          <Popup
            longitude={lng}
            latitude={lat}
            anchor="top"
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            You Are Here
          </Popup>
        )}
      </Map>
      <Button
        onClick={() => {
          addSaves(location);
          dispatch(setItemSaved(!savedToLocal));
        }}
        sx={
          savedToLocal
            ? { margin: "0 !important", backgroundColor: "green" }
            : { margin: "0 !important", backgroundColor: "" }
        }
        variant={"contained"}
      >
        {savedToLocal ? "Location Saved" : "Save Location"}
      </Button>
    </>
  );
};

export default Mapbox;
