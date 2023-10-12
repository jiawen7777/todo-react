import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Replace with your backend URL

export const fetchParentTasks = async () => {
    try {
    const response = await axios.get(`${API_URL}/todos`);
        return response.data.data;
    } catch (error) {
    console.error("Error fetching todos:", error);
        throw error;
    }
};

export const fetchSubTasks = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/todos/${id}`);
        return response.data.data;
        } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};

export const addTask = async (title) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, {
      title: title,
      is_completed: false,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const addSubTask = async (title, id) => {
  try {
    const response = await axios.post(`${API_URL}/todos/${id}`, {
      title: title,
      is_completed: false,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error("Error when deleting todo:", error);
    throw error;
  }
};

export const toggleTaskComplete = async (tasks, id) => {
    try {
        const response = await axios.put(`${API_URL}/todos/${id}`, {
          is_completed: !tasks.find((todo) => todo.id === id).is_completed,
          title: tasks.find((todo) => todo.id === id).title,
        });
        return response.data;
    } catch (error) {
      console.error("Error when toggling todo completion status:", error);
      throw error;
    }
}

export const editTask = async (editedText, todo) => {
    try {
        const response = await axios.put(`${API_URL}/todos/${todo.id}`, {
          title: editedText,
          is_completed: todo.is_completed,
        });
        return response.data;
    } catch (error) {
        console.error("Error when toggling todo completion status:", error);
        throw error;
    }
}
