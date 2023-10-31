import { useState, useEffect } from "react";
import { fetchCategories } from "../apis/todos";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return {
    categories,
    setCategories
  };
};
