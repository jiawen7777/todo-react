import { useState, useEffect } from "react";
import { fetchParentTasks } from "../api";

export const useTodos = ({ category }) => {
  const [todos, setTodos] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  // when loading all tasks
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchParentTasks(category);
      setTodos(data);
    };
    fetchData();
  }, [category]);

  return {
    todos,
    subTasks,
    todoEditing,
    setTodos,
    setSubTasks,
    setTodoEditing,
  };
};
