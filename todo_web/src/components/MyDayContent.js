import React from "react";
import Grid from "@mui/material/Grid";
import ListEntity from "./ListEntity";
import WeatherCard from "./TodayinfoContent";

const MyDayContent = () => {
  const category = 2;

  return (
    <Grid container spacing={4} id="todo-list" style={{ padding: 100 }}>
      <Grid item xs={12}>
        <WeatherCard></WeatherCard>
      </Grid>
      <Grid item xs={12}>
        <ListEntity category={category} />
      </Grid>
    </Grid>
  );
};

export default MyDayContent;
