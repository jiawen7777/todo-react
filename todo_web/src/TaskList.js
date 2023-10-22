import React from "react";
import Grid from "@mui/material/Grid";
import ListEntity from "./ListEntity";

const TaskList = () => {
  return (
    <Grid
      container
      spacing={4}
      id="todo-list"
      style={{ padding: 100 }}
    >
      <ListEntity />
    </Grid>
  );
};

export default TaskList;
