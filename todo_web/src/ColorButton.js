import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[500]),
  backgroundColor: indigo[500],
  "&:hover": {
    backgroundColor: indigo[700],
  },
  margin: 5,
}));

export default ColorButton;