import React from "react";
import { Grid, List, ListItem, TextField, Typography } from "@mui/material";
function SideList({ categories, handleAddCategory, setSelectedPage }) {
  const handleAddCategoryEnter = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const categoryText = document.getElementById("categoryAdd").value.trim();
      if (categoryText.length > 0) {
        try {
          await handleAddCategory(categoryText);
          document.getElementById("categoryAdd").value = "";
        } catch (error) {
          console.error("Error adding category:", error);
        }
      } else {
        alert("Enter a valid category name");
      }
    }
  };

  return (
    <Grid container xs={12} sx={{ p: 2 }}>
      <List sx={{ width: "100%", mb: 2 }}>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            onClick={() => setSelectedPage(category.id)}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Typography variant="body2">{category.category_name}</Typography>
          </ListItem>
        ))}
      </List>

      <Grid item xs={12}>
        <TextField
          type="text"
          id="categoryAdd"
          label="Add a category"
          fullWidth
          variant="outlined"
          onKeyDown={(event) => handleAddCategoryEnter(event)}
        />
      </Grid>
    </Grid>
  );
}

export default SideList;
