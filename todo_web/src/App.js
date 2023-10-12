import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Checkbox, Collapse,CardContent, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTodos } from "./TodoService";


const App = () => {

  const [expandedItem, setExpandedItem] = useState(null); 
  const {
    todos,
    subTasks,
    todoEditing,
    handleAddParentTask,
    handleAddSubTask,
    handleFetchAllSubTasks,
    handleToggleSubTaskComplete,
    handleToggleParentTaskComplete,
    handleParentTaskEdit,
    handleSubTaskEdit,
    handleDeleteParentTask,
    handleDeleteSubTask,
    setTodos,
    setSubTasks,
    setTodoEditing
  } = useTodos();

  const buttonStyle = {
    margin: "4px", // Add margin to the buttons
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoText = document.getElementById("todoAdd").value.trim();

    if (todoText.length > 0) {
      try {
        await handleAddParentTask(todoText); // 使用 handleAddTodo 函数
        document.getElementById("todoAdd").value = "";
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else {
      alert("Enter a valid task");
    }
  };


  async function handleSubmitSubTask(e, id) {
    e.preventDefault();
    const subTaskAddId = "subTaskAdd" + id
    const todoText = document.getElementById(subTaskAddId).value.trim();
    console.log(todoText);
    if (todoText.length > 0) {
      try {
        handleAddSubTask(todoText, id);
        document.getElementById(subTaskAddId).value = "";
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else {
      alert("Enter a valid task");
    }
  }

  async function deleteTodo(id) {
    handleDeleteParentTask(id);
  }

  async function deleteSubTask(id) {
    handleDeleteSubTask(id);
  }
  
  async function fetchSubTasks(id) {
    handleFetchAllSubTasks(id);
  }

  async function toggleComplete(id) {
    handleToggleParentTaskComplete(id);
  }

  async function toggleSubTaskComplete(id) {
    handleToggleSubTaskComplete(id);
  }

  async function submitEdits(currentTask) {
    const updatedText = document.getElementById(currentTask.id).value;
    handleParentTaskEdit(updatedText, currentTask);
  }

  async function submitSubTaskEdit(currentSubTask) {
    const updatedText = document.getElementById(currentSubTask.id).value;
    handleSubTaskEdit(updatedText, currentSubTask);
  }



return (
  <Grid container spacing={2} id="todo-list" style={{ maxWidth: "80%" }}>
    <Grid item xs={12} justifyContent="center">
      <Typography
        variant="h3"
        align="center"
        fontFamily="Times New Roman"
        marginTop={10}
        gutterBottom
        fullWidth
      >
        Work Logger
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={9}>
            <TextField
              type="text"
              id="todoAdd"
              fullWidth
              inputProps={{ style: { textAlign: "left", padding: "10px" } }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              fullWidth
              inputProps={{ padding: "10px", maxWidth: "100%" }}
              type="submit"
            >
              Add Work
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>

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

              {subTasks.map((subTask) => (
                <div>
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
                      <Button
                        sx={buttonStyle}
                        onClick={() => submitSubTaskEdit(subTask)}
                      >
                        Submit Edits
                      </Button>
                    ) : (
                      <Button
                        sx={buttonStyle}
                        variant="contained"
                        onClick={() => setTodoEditing(subTask.id)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  <div>
                    <Button
                      sx={buttonStyle}
                      variant="contained"
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => deleteSubTask(subTask.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
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
  </Grid>
);
};

export default App;