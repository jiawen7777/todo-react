import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Checkbox, Collapse,CardContent, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null); 
  const [subTasks, setSubTasks] = useState([]);

  const API_URL = "http://localhost:8000/api"; // Replace with your backend URL

  const buttonStyle = {
    margin: "4px", // Add margin to the buttons
  };


  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get(`${API_URL}/todos`);
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchTodos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const todoText = document.getElementById("todoAdd").value.trim();

    if (todoText.length > 0) {
      try {
        const response = await axios.post(`${API_URL}/todos`, {
          title: todoText,
          is_completed: false,
        });

        setTodos([...todos, response.data]);
        document.getElementById("todoAdd").value = "";
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else {
      alert("Enter a valid task");
    }
  }


  async function handleSubmitSubTask(e, id) {
    e.preventDefault();
    const subTaskAddId = "subTaskAdd" + id
    const todoText = document.getElementById(subTaskAddId).value.trim();
    console.log(todoText);
    if (todoText.length > 0) {
      try {
        const response = await axios.post(`${API_URL}/todos/${id}`, {
          title: todoText,
          is_completed: false,
        });

        setSubTasks([...subTasks, response.data]);
        document.getElementById(subTaskAddId).value = "";
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else {
      alert("Enter a valid task");
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function deleteSubTask(id) {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      const updatedSubTasks = subTasks.filter((subTask) => subTask.id !== id);
      setSubTasks(updatedSubTasks);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  
  async function fetchSubTasks(id) {
    const response = await axios.get(`${API_URL}/todos/${id}`);
    try {
      setSubTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function toggleComplete(id) {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        is_completed: !todos.find((todo) => todo.id === id).is_completed,
        title: todos.find((todo) => todo.id === id).title,
      });

      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return response.data;
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }


  async function toggleSubTaskComplete(id) {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        is_completed: !subTasks.find((subTask) => subTask.id === id).is_completed,
        title: subTasks.find((subTask) => subTask.id === id).title,
      });

      const updatedSubTasks = subTasks.map((subTask) => {
        if (subTask.id === id) {
          return response.data;
        }
        return subTask;
      });

      setSubTasks(updatedSubTasks);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function submitEdits(newTodo) {
    const updatedText = document.getElementById(newTodo.id).value;

    try {
      const response = await axios.put(`${API_URL}/todos/${newTodo.id}`, {
        title: updatedText,
        is_completed: newTodo.is_completed,
      });

      const updatedTodos = todos.map((todo) => {
        if (todo.id === newTodo.id) {
          return response.data;
        }
        return todo;
      });

      setTodos(updatedTodos);
      setTodoEditing(null);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  }

  async function submitSubTaskEdit(newSubTask) {
    const updatedText = document.getElementById(newSubTask.id).value;

    try {
      const response = await axios.put(`${API_URL}/todos/${newSubTask.id}`, {
        title: updatedText,
        is_completed: newSubTask.is_completed,
      });

      const updatedSubTasks = subTasks.map((subTask) => {
        if (subTask.id === newSubTask.id) {
          return response.data;
        }
        return subTask;
      });

      setSubTasks(updatedSubTasks);
      setTodoEditing(null);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
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