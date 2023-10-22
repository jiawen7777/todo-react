import React from "react";
import Grid from "@mui/material/Grid";
import ListEntity from "./ListEntity";

const MyDayContent = () => {
  const category = "myday";

  return (
    <Grid container spacing={4} id="todo-list" style={{ padding: 100 }}>
      <ListEntity category={category} />
    </Grid>
  );
};

export default MyDayContent;
