import axios from "axios";

const API_URL = "http://localhost:8000/api/category"; // Replace with your backend URL


export const editCategory = async (editedText, category_id) => {
  try {
    const response = await axios.put(`${API_URL}/${category_id}`, {
      category_name: editedText,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error editing category name", error);
    throw error;
  }
};

export const addCategory = async (category_name) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      category_name: category_name,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};