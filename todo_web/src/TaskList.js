import React from "react";
import Grid from "@mui/material/Grid";
import ListEntity from "./ListEntity";

const TaskList = () => {
    const category = "todo"
  return (
    <Grid container spacing={4} id="todo-list" style={{ padding: 100 }}>
      <ListEntity category={category} />
    </Grid>
  );
};

export default TaskList;
