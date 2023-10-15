import React, { useState } from "react";
import { Checkbox, TextField, Grid } from "@mui/material";
import DeleteButton from "./DeleteButton";

const SubList = ({
  subTasks,
  toggleSubTaskComplete,
  submitSubTaskEdit,
  deleteSubTask,
}) => {
  const [editingSubTask, setEditingSubTask] = useState(null);

  const handleSubTaskClick = (subTask) => {
    if (subTask.id !== editingSubTask) {
      setEditingSubTask(subTask.id);
    }
  };

  const handleSubTaskBlur = (subTask) => {
    submitSubTaskEdit(subTask);
    if (editingSubTask !== null) {
      setEditingSubTask(null);
    }
  };

  const handleEnter = (event, subTask) => {
    if (event.key === "Enter") {
      submitSubTaskEdit(subTask);
      if (editingSubTask !== null) {
        setEditingSubTask(null);
      }
    }
  };

  return (
    <Grid container>
      {subTasks.map((subTask) => (
        <Grid container key={subTask.id} marginTop={3}>
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
            {subTask.id === editingSubTask ? (
              <TextField
                type="text"
                id={subTask.id}
                fullWidth
                defaultValue={subTask.title}
                onBlur={() => handleSubTaskBlur(subTask)}
                onKeyDown={(event) => handleEnter(event, subTask)}
              />
            ) : (
              <div
                style={{
                  textDecoration: subTask.is_completed
                    ? "line-through"
                    : "none",
                }}
                onClick={() => handleSubTaskClick(subTask)}
              >
                {subTask.title}
              </div>
            )}
          </Grid>
          <Grid item xs={2}>
            <DeleteButton onClick={() => deleteSubTask(subTask.id)}>
              Delete
            </DeleteButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubList;
