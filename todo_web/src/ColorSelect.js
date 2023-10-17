import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CircleIcon from "@mui/icons-material/Circle";
import { Grid } from "@mui/material";

function ColorSelect() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <Grid container>
      <Select value={selectedColor} onChange={handleColorChange} displayEmpty>
        <MenuItem value="" disabled>
          Category
        </MenuItem>
        <MenuItem value="red">
          <IconButton>
            <CircleIcon style={{ color: "red" }} />
          </IconButton>
          Red
        </MenuItem>
        <MenuItem value="orange">
          <IconButton>
            <CircleIcon style={{ color: "orange" }} />
          </IconButton>
          Orange
        </MenuItem>
        <MenuItem value="yellow">
          <IconButton>
            <CircleIcon style={{ color: "yellow" }} />
          </IconButton>
          Yellow
        </MenuItem>
        <MenuItem value="green">
          <IconButton>
            <CircleIcon style={{ color: "green" }} />
          </IconButton>
          Green
        </MenuItem>
        <MenuItem value="cyan">
          <IconButton>
            <CircleIcon style={{ color: "cyan" }} />
          </IconButton>
          Cyan
        </MenuItem>
        <MenuItem value="blue">
          <IconButton>
            <CircleIcon style={{ color: "blue" }} />
          </IconButton>
          Blue
        </MenuItem>
        <MenuItem value="purple">
          <IconButton>
            <CircleIcon style={{ color: "purple" }} />
          </IconButton>
          Purple
        </MenuItem>
      </Select>
    </Grid>
  );
}

export default ColorSelect;
