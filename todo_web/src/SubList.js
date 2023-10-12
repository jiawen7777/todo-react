// SubList.js

import React from "react";
import { Checkbox, TextField, Button } from "@mui/material";

const SubList = ({
  subTasks,
  todoEditing,
  toggleSubTaskComplete,
  submitSubTaskEdit,
  setTodoEditing,
  deleteSubTask,
}) => {
  return (
    <div>
      {subTasks.map((subTask) => (
        <div key={subTask.id}>
          <div>
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
          </div>
          <div>
            <Checkbox
              id="is_completed"
              checked={subTask.is_completed}
              onChange={() => toggleSubTaskComplete(subTask.id)}
            />
          </div>
          <div>
            {subTask.id === todoEditing ? (
              <Button onClick={() => submitSubTaskEdit(subTask)}>
                Submit Edits
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setTodoEditing(subTask.id)}
              >
                Edit
              </Button>
            )}
          </div>
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => deleteSubTask(subTask.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubList;
