import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[200]),
  "&:hover": {
    backgroundColor: orange[500],
  },
  borderColor: orange[500],
  margin: 5,
}));

export default ColorButton;
