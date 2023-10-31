import { useCategories } from "../hooks/useCategories.js";
import { addCategory, editCategory } from "../apis/categories.js";

export const categoryService = () => {
  const {
    categories,
    setCategories
  } = useCategories();

  const handleAddCategory = async (category_name) => {
    const newCategory = await addCategory(category_name);
    setCategories([...categories, newCategory]);
  };

  const handleCategoryEdit = async (updatedText, category_id) => {
    try {
      const data = await editCategory(updatedText, category_id);

      const updatedCategories = categories.map((category) => {
        if (category.id === category_id) {
          return data;
        }
        return category;
      });

      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };
  


  return {
    categories,
    setCategories,
    handleAddCategory,
    handleCategoryEdit,
  };
};
