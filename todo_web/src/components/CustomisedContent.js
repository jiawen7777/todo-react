import React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import ListEntity from "./ListEntity"; 
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
const CustomisedContent = ({
  category_id,
  category_name,
  categories,
  setCategories,
  handleCategoryEdit,
}) => {
  const [categoryEditing, setCategoryEditing] = useState(false);

  const h3Styles = {
    fontSize: "3rem", // 根据你的主题设置或者Material-UI的默认值进行调整
    fontWeight: 400, // 根据你的主题设置或者Material-UI的默认值进行调整
    lineHeight: 1.167, // 根据你的主题设置或者Material-UI的默认值进行调整
    letterSpacing: "0em", // 根据你的主题设置或者Material-UI的默认值进行调整
    color: "#1c54b2", // 保持与你原有设置一致
  };

  const handleEnter = async (event) => {
    if (event.key === "Enter") {
      const updatedText = document.getElementById("category_text").value;
      handleCategoryEdit(updatedText, category_id);
      if (categoryEditing === true) {
        setCategoryEditing(false);
      }
    }
  };


  return (
    <Grid container spacing={4} id="todo-list" style={{ padding: 100 }}>
      <Typography variant="h3" style={{ color: "#1c54b2" }}>
        {categoryEditing ? (
          <TextField
            type="text"
            id="category_text"
            defaultValue={category_name}
            fullWidth
            InputProps={{
              style: h3Styles,
            }}
            onKeyDown={(event) => handleEnter(event)}
          />
        ) : (
          <div onClick={() => setCategoryEditing(true)}>{category_name}</div>
        )}
      </Typography>
      <Grid item xs={12}>
        <ListEntity category={category_id} />
      </Grid>
    </Grid>
  );
};

export default CustomisedContent;
