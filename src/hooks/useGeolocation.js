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
      //   lat: 48.6198, // Широта Ужгорода
      //   lng: 22.2879, // Довгота Ужгорода
      // },
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
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
