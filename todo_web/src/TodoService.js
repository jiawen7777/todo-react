import {
  fetchSubTasks,
  addTask,
  addSubTask,
  deleteTask,
  toggleTaskComplete,
  editTask,
  toggleStar,
  toggleMyDay,
} from "./api";

import { useTodos } from "./hooks/useTodos.js";

export const todoService = ({ category }) => {
  // when loading all tasks
  const {
    todos,
    subTasks,
    todoEditing,
    setTodos,
    setSubTasks,
    setTodoEditing,
  } = useTodos({ category });

  // create a parent task
  const handleAddParentTask = async (title, category) => {
    const newTodo = await addTask(title, category);
    setTodos([...todos, newTodo]);
  };

  // create a sub task
  const handleAddSubTask = async (title, id) => {
    const newSubTask = await addSubTask(title, id);
    setSubTasks([...subTasks, newSubTask]);
  };

  // select all subtasks with parent id
  const handleFetchAllSubTasks = async (id) => {
    try {
      const data = await fetchSubTasks(id);
      setSubTasks(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // toggle sub task
  const handleToggleSubTaskComplete = async (id) => {
    try {
      const data = await toggleTaskComplete(subTasks, id);

      const updatedSubTasks = subTasks.map((subTask) => {
        if (subTask.id === id) {
          return data;
        }
        return subTask;
      });

      setSubTasks(updatedSubTasks);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // toggle parent task
  const handleToggleParentTaskComplete = async (id) => {
    try {
      const data = await toggleTaskComplete(todos, id);
      console.log(data);
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return data;
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleToggleParentTaskStar = async (id) => {
    try {
      const data = await toggleStar(todos, id);
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return data;
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleParentTaskEdit = async (updatedText, currentTodo) => {
    try {
      const data = await editTask(updatedText, currentTodo);

      const updatedTodos = todos.map((todo) => {
        if (todo.id === currentTodo.id) {
          return data;
        }
        return todo;
      });

      setTodos(updatedTodos);
      setTodoEditing(null);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleSubTaskEdit = async (updatedText, currentTodo) => {
    try {
      const data = await editTask(updatedText, currentTodo);

      const updatedSubTasks = subTasks.map((subTask) => {
        if (subTask.id === currentTodo.id) {
          return data;
        }
        return subTask;
      });

      setSubTasks(updatedSubTasks);
      setTodoEditing(null);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDeleteParentTask = async (id) => {
    try {
      await deleteTask(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleDeleteSubTask = async (id) => {
    try {
      await deleteTask(id);
      const updatedSubTasks = subTasks.filter((subTask) => subTask.id !== id);
      setSubTasks(updatedSubTasks);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleMyDay = async (id) => {
    try {
      const data = await toggleMyDay(todos, id);
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return data;
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error adding to MyDay :", error);
    }
  };

  return {
    todos,
    subTasks,
    todoEditing,
    setTodos,
    setSubTasks,
    setTodoEditing,
    handleAddParentTask,
    handleAddSubTask,
    handleFetchAllSubTasks,
    handleToggleSubTaskComplete,
    handleToggleParentTaskComplete,
    handleParentTaskEdit,
    handleSubTaskEdit,
    handleDeleteParentTask,
    handleDeleteSubTask,
    handleToggleParentTaskStar,
    handleToggleMyDay,
  };
};
