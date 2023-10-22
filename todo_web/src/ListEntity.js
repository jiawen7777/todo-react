import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SubList from "./SubList";
import { Collapse, IconButton } from "@mui/material";
import ColorButton from "./ColorButton";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import "./style.css";
import { useRef } from "react";
import ColorSelect from "./ColorSelect";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { todoService } from "./TodoService";

function TodoList() {
  const gridRef = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);

  async function handleSubmitSubTask(e, id) {
    e.preventDefault();
    const subTaskAddId = "subTaskAdd" + id;
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

  async function fetchSubTasks(id) {
    handleFetchAllSubTasks(id);
  }

  async function toggleComplete(id) {
    handleToggleParentTaskComplete(id);
  }

  async function toggleStar(id) {
    handleToggleParentTaskStar(id);
  }

  async function submitEdits(currentTask) {
    const updatedText = document.getElementById(currentTask.id).value;
    handleParentTaskEdit(updatedText, currentTask);
  }

  const {
    todos,
    subTasks,
    todoEditing,
    setSubTasks,
    setTodoEditing,
    handleAddParentTask,
    handleFetchAllSubTasks,
    handleToggleParentTaskComplete,
    handleParentTaskEdit,
    handleDeleteParentTask,
    handleToggleParentTaskStar,
    handleAddSubTask,
    handleToggleSubTaskComplete,
    handleSubTaskEdit,
    handleDeleteSubTask,
  } = todoService();

  const handleTaskClick = (task) => {
    if (task.id !== todoEditing) {
      setTodoEditing(task.id);
    }
  };

  const handleTaskBlur = (task) => {
    submitEdits(task);
    if (todoEditing !== null) {
      setTodoEditing(null);
    }
  };

  const handleEnter = (event, task) => {
    if (event.key === "Enter") {
      submitEdits(task);
      if (todoEditing !== null) {
        setTodoEditing(null);
      }
    }
  };

  const handleAddWorkEnter = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          type="text"
          id="todoAdd"
          label="Add a task"
          fullWidth
          variant="standard"
          className="custom-grid-item"
          style={{padding:10, paddingLeft:20}}
          onKeyDown={(event) => handleAddWorkEnter(event)}
        />
      </Grid>
      <Grid item xs={12} marginTop={2}>
        {todos.map((todo) => (
          <Grid
            container
            key={todo.id}
            style={{
              backgroundColor: todo.is_completed ? "#f2f2f2" : "#ffffff",
              cursor: "pointer",
            }}
            ref={gridRef}
            className="custom-grid-item"
          >
            <Grid item xs={9}>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <ColorButton
                    onClick={(event) => {
                      // 当事件的目标是 Grid 本身时，执行你的 onClick 逻辑
                      console.log("Grid clicked");
                      setExpandedItem(
                        expandedItem === todo.id ? null : todo.id
                      );
                      setSubTasks([]);
                      fetchSubTasks(todo.id);
                    }}
                  >
                    ·
                  </ColorButton>
                </Grid>
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
                      fullWidth
                      onBlur={() => handleTaskBlur(todo)}
                      onKeyDown={(event) => handleEnter(event, todo)}
                    />
                  ) : (
                    <div
                      style={{
                        textDecoration: todo.is_completed
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => handleTaskClick(todo)}
                    >
                      {todo.title}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <DeleteButton
                variant="outlined"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </DeleteButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => toggleStar(todo.id)}>
                {todo.is_important ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent={"right"}
              hidden={expandedItem !== todo.id}
            >
              <Collapse
                // TODO: wrap subtask component
                in={expandedItem === todo.id}
                onClick={(event) => {
                  // 阻止事件冒泡以防止触发折叠
                  event.stopPropagation();
                }}
                className="custom-grid-item"
              >
                <form onSubmit={(event) => handleSubmitSubTask(event, todo.id)}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        id={"subTaskAdd" + todo.id}
                        sx={{ textAlign: "right", width: "100%" }} // 调整文本框样式
                        label="Add a sub task"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SubList
                        subTasks={subTasks}
                        handleToggleSubTaskComplete={
                          handleToggleSubTaskComplete
                        }
                        handleSubTaskEdit={handleSubTaskEdit}
                        handleDeleteSubTask={handleDeleteSubTask}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Collapse>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default TodoList;
