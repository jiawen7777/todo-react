import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  const API_URL = "http://localhost:8000/api"; // Replace with your backend URL


  const style = {
    width: "100%",
    maxWidth: 1000,
    bgcolor: "background.paper",
  };

  const stackStyle = {
    border: "1px solid #000", // Add a border around the Box
    padding: 2, // Add some padding inside the Box
    alignItems: "center", // Center horizontally
    justifyContent: "center" // Center vertically
  };
  

  const buttonStyle = {
    margin: "4px", // Add margin to the buttons
  };


  const listItemStyle = {
    marginTop: "8px", // Add margin at the top
    marginBottom: "8px", // Add margin at the bottom
    
    
    "&:not(:last-child)": {
      // Add a divider for all list items except the last one
      borderBottom: "2px solid #ccc",
    },
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

  async function deleteTodo(id) {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
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

      <Grid item xs={12} >
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
                <Grid item xs={8} >
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
            </Grid>
            <Grid item xs={4} marginLeft={10} justifyContent="center" >
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
