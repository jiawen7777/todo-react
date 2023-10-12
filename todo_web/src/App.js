import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Checkbox, Collapse,CardContent, Container, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTodos } from "./TodoService";
import SubList from "./SubList"; // 导入 SubList 组件
import ListEntity from "./ListEntity"

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

    <ListEntity
      todos={todos}
      todoEditing={todoEditing}
      toggleComplete={toggleComplete}
      setExpandedItem={setExpandedItem}
      setSubTasks={setSubTasks}
      fetchSubTasks={fetchSubTasks}
      handleSubmitSubTask={handleSubmitSubTask}
      submitSubTaskEdit={submitSubTaskEdit}
      deleteSubTask={deleteSubTask}
      setTodoEditing={setTodoEditing}
      submitEdits={submitEdits}
      deleteTodo={deleteTodo}
      expandedItem={expandedItem}
      subTasks={subTasks}
      toggleSubTaskComplete={toggleSubTaskComplete}
    />
  </Grid>
);
};

export default App;