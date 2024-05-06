import React from "react";
import sun from "../assets/images/sun.gif";
import { Stack } from "@mui/material";

const Loader = () => {
  return (
    <>
      <Stack
        sx={{ marginTop: 30 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <img className="loader" src={sun} alt="loading" />
      </Stack>
    </>
  );
};

export default Loader;
