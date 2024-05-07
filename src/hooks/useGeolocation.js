import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [geoLocation, setGeoLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const successMsg = (location) => {
    setGeoLocation({
      loaded: true,
      // coordinates: {
      //   lat: 48.6324, //Оленьово
      //   lng: 22.579,
      // },
      coordinates: {
        lat: 48.6208, //Ужгород
        lng: 22.2879,
      },
      // coordinates: {
      //   lat: location.coords.latitude, //За геолокацією
      //   lng: location.coords.longitude,
      // },
    });
  };

  const errorMsg = (error) => {
    setGeoLocation({
      loaded: true,
      error,
    });
  };

  const options = {
    enableHighAccuracy: true,
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      errorMsg({
        code: 0,
        message: "Geolocation not enabled or supported",
      });
    }
    navigator.geolocation.getCurrentPosition(successMsg, errorMsg, options);
    // eslint-disable-next-line
  }, []);
  return geoLocation;
};

export default useGeoLocation;
