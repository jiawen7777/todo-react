import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SubList from "./SubList";
import { Collapse } from "@mui/material";
const buttonStyle = {
  margin: "4px", // Add margin to the buttons
};

function TodoList({
  todos,
  todoEditing,
  toggleComplete,
  setExpandedItem,
  setSubTasks,
  fetchSubTasks,
  handleSubmitSubTask,
  submitSubTaskEdit,
  deleteSubTask,
  setTodoEditing,
  submitEdits,
  deleteTodo,
  expandedItem,
  subTasks,
  toggleSubTaskComplete,
}) {
  return (
    <Grid item xs={12}>
      {todos.map((todo) => (
        <Grid
          container
          spacing={3}
          key={todo.id}
          className="todo"
          style={{
            backgroundColor: todo.is_completed ? "#f0f0f0" : "transparent",
            margin: 0,
            borderTop: "2px solid #ccc",
          }}
          fullWidth
        >
          <Grid item xs={6}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={2}>
                <Checkbox
                  id="is_completed"
                  checked={todo.is_completed}
                  onChange={() => toggleComplete(todo.id)}
                />
              </Grid>
              <Grid item xs={8}>
                {todo.id === todoEditing ? (
                  <TextField
                    type="text"
                    id={todo.id}
                    defaultValue={todo.title}
                  />
                ) : (
                  <div
                    style={{
                      textDecoration: todo.is_completed
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {todo.title}
                  </div>
                )}
              </Grid>
            </Grid>
            <Button
              onClick={() => {
                setExpandedItem(expandedItem === todo.id ? null : todo.id);
                setSubTasks([]);
                fetchSubTasks(todo.id);
              }}
            >
              {expandedItem === todo.id ? "^" : "V"}
            </Button>
            <Collapse in={expandedItem === todo.id}>
              <form onSubmit={(event) => handleSubmitSubTask(event, todo.id)}>
                <TextField
                  type="text"
                  id={"subTaskAdd" + todo.id}
                  fullWidth
                  inputProps={{ style: { textAlign: "left", padding: "10px" } }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  inputProps={{ padding: "10px", maxWidth: "100%" }}
                  type="submit"
                >
                  Add Work
                </Button>
              </form>

              <SubList
                subTasks={subTasks}
                todoEditing={todoEditing}
                toggleSubTaskComplete={toggleSubTaskComplete}
                submitSubTaskEdit={submitSubTaskEdit}
                setTodoEditing={setTodoEditing}
                deleteSubTask={deleteSubTask}
              />
            </Collapse>
          </Grid>
          <Grid
            item
            xs={4}
            align="right"
            padding={2}
            marginLeft={10}
            justifyContent="center"
          >
            {todo.id === todoEditing ? (
              <Button sx={buttonStyle} onClick={() => submitEdits(todo)}>
                Submit Edits
              </Button>
            ) : (
              <Button
                sx={buttonStyle}
                variant="contained"
                onClick={() => setTodoEditing(todo.id)}
              >
                Edit
              </Button>
            )}
            <Button
              sx={buttonStyle}
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default TodoList;
