// SubList.js

import React from "react";
import { Checkbox, TextField, Grid } from "@mui/material";
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
    <Grid container>
      {subTasks.map((subTask) => (
        <Grid container key={subTask.id}>
          {/* complete checkbox */}
          <Grid item xs={2}>
            <Checkbox
              id="is_completed"
              checked={subTask.is_completed}
              onChange={() => toggleSubTaskComplete(subTask.id)}
            />
          </Grid>
          {/* text field */}
          <Grid item xs={8}>
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
            <Grid container>
              <Grid item xs={6}>
                {subTask.id === todoEditing ? (
                  <ColorButton onClick={() => submitSubTaskEdit(subTask)}>
                    Submit Edits
                  </ColorButton>
                ) : (
                  <ColorButton
                    variant="outlined"
                    onClick={() => setTodoEditing(subTask.id)}
                  >
                    Edit
                  </ColorButton>
                )}
              </Grid>
              <Grid item xs={6}>
                <DeleteButton onClick={() => deleteSubTask(subTask.id)}>
                  Delete
                </DeleteButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubList;
