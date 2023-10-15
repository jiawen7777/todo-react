// SubList.js

import React from "react";
import { Checkbox, TextField, Button, Grid } from "@mui/material";
import ColorButton from "./ColorButton";
import DeleteButton from "./DeleteButton";
const SubList = ({
  subTasks,
  todoEditing,
  toggleSubTaskComplete,
  submitSubTaskEdit,
  setTodoEditing,
  deleteSubTask,
}) => {
  return (
    <Grid container spacing={2} >
      {subTasks.map((subTask) => (
        <Grid container spacing={2} key={subTask.id}>
          <Grid item xs={2}>
            <Checkbox
              id="is_completed"
              checked={subTask.is_completed}
              onChange={() => toggleSubTaskComplete(subTask.id)}
            />
          </Grid>
          <Grid item xs={5}>
            {subTask.id === todoEditing ? (
              <TextField
                type="text"
                id={subTask.id}
                defaultValue={subTask.title}
              />
            ) : (
              <div
                style={{
                  textDecoration: subTask.is_completed
                    ? "line-through"
                    : "none",
                }}
              >
                {subTask.title}
              </div>
            )}
          </Grid>
          <Grid item xs={2}>
            {subTask.id === todoEditing ? (
              <ColorButton onClick={() => submitSubTaskEdit(subTask)}>
                Submit Edits
              </ColorButton>
            ) : (
              <ColorButton
                variant="contained"
                onClick={() => setTodoEditing(subTask.id)}
              >
                Edit
              </ColorButton>
            )}
          </Grid>
          <Grid item xs={2}>
            <DeleteButton
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => deleteSubTask(subTask.id)}
            >
              Delete
            </DeleteButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubList;
