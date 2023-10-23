import React from "react";
import { Grid, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function WeatherCard() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}`;

  return (
    <div style={{ maxWidth: "700px" }}>
      <Grid container alignItems="center">
        <WbSunnyIcon
          fontSize="large"
          style={{ marginRight: "10px", color: "orange" }}
        />
        <Typography variant="h3" style={{ color: "#1c54b2" }}>
          My Day
        </Typography>
      </Grid>
      <Typography variant="h6" style={{ marginTop: "5px", paddingLeft: "5px" }}>
        {formattedDate}
      </Typography>
    </div>
  );
}
