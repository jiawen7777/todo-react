import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SubList from "./SubList";
import { Collapse } from "@mui/material";
import ColorButton from "./ColorButton";
import DeleteButton from "./DeleteButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
              <Grid item xs={12}></Grid>
              <Grid item xs={9}></Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            align="right"
            padding={2}
            marginLeft={10}
            justifyContent="center"
          >
            {todo.id === todoEditing ? (
              <ColorButton onClick={() => submitEdits(todo)}>
                Submit Edits
              </ColorButton>
            ) : (
              <ColorButton
                variant="contained"
                onClick={() => setTodoEditing(todo.id)}
              >
                Edit
              </ColorButton>
            )}
            <DeleteButton
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </DeleteButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                setExpandedItem(expandedItem === todo.id ? null : todo.id);
                setSubTasks([]);
                fetchSubTasks(todo.id);
              }}
            >
              {expandedItem === todo.id ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Button>
          </Grid>
          <Grid item xs={9} fullWidth justifyContent={"right"}>
            <Collapse in={expandedItem === todo.id}>
              <form onSubmit={(event) => handleSubmitSubTask(event, todo.id)}>
                <Grid container spacing={5} align="right">
                  <Grid item xs={8} align="right">
                    <TextField
                      type="text"
                      id={"subTaskAdd" + todo.id}
                      fullWidth
                      sx={{ textAlign: "right", width: "100%" }} // 调整文本框样式
                    />
                  </Grid>
                  <Grid item xs={3} align="right">
                    <ColorButton
                      variant="contained"
                      fullWidth
                      inputProps={{ padding: "10px", maxWidth: "100%" }}
                      type="submit"
                    >
                      Add Work
                    </ColorButton>
                  </Grid>
                  <Grid item xs={12}>
                    <SubList
                      subTasks={subTasks}
                      todoEditing={todoEditing}
                      toggleSubTaskComplete={toggleSubTaskComplete}
                      submitSubTaskEdit={submitSubTaskEdit}
                      setTodoEditing={setTodoEditing}
                      deleteSubTask={deleteSubTask}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </form>
            </Collapse>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default TodoList;
