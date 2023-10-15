import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SubList from "./SubList";
import { Collapse } from "@mui/material";
import ColorButton from "./ColorButton";
import DeleteButton from "./DeleteButton";
import "./style.css";

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
  handleSubmit,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="custom-grid-item">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                type="text"
                id="todoAdd"
                label="Add a task"
                fullWidth
                inputProps={{ style: { textAlign: "left", padding: "10px" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <ColorButton
                variant="outlined"
                inputProps={{ marginLeft: "10px", maxWidth: "100%" }}
                type="submit"
                fullWidth
              >
                Add Work
              </ColorButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        {todos.map((todo) => (
          <Grid
            container
            spacing={2}
            key={todo.id}
            style={{
              backgroundColor: todo.is_completed ? "#f2f2f2" : "#ffffff",
              cursor: "pointer",
            }}
            className="custom-grid-item"
            onClick={() => {
              setExpandedItem(expandedItem === todo.id ? null : todo.id);
              setSubTasks([]);
              fetchSubTasks(todo.id);
            }}
          >
            <Grid item xs={10}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Checkbox
                    id="is_completed"
                    checked={todo.is_completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                </Grid>
                <Grid item xs={10}>
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
            <Grid item xs={2}>
              <Grid container spacing={1}>
                <Grid item xs={6} fullWidth>
                  {todo.id === todoEditing ? (
                    <ColorButton onClick={() => submitEdits(todo)}>
                      Submit Edits
                    </ColorButton>
                  ) : (
                    <ColorButton
                      variant="outlined"
                      onClick={() => setTodoEditing(todo.id)}
                    >
                      Edit
                    </ColorButton>
                  )}
                </Grid>
                <Grid item xs={6} fullWidth>
                  <DeleteButton
                    variant="outlined"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </DeleteButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} justifyContent={"right"}>
              <Collapse
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
                      <Grid container>
                        <Grid item xs={10}>
                          <TextField
                            type="text"
                            id={"subTaskAdd" + todo.id}
                            sx={{ textAlign: "right", width: "100%" }} // 调整文本框样式
                            label="Add a sub task"
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <ColorButton
                            variant="outlined"
                            inputProps={{ padding: "10px", maxWidth: "100%" }}
                            type="submit"
                            fullWidth
                          >
                            Add Subtask
                          </ColorButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <SubList
                        subTasks={subTasks}
                        todoEditing={todoEditing}
                        toggleSubTaskComplete={toggleSubTaskComplete}
                        submitSubTaskEdit={submitSubTaskEdit}
                        setTodoEditing={setTodoEditing}
                        deleteSubTask={deleteSubTask}
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
