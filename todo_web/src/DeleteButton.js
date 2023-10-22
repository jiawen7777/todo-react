import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[200]),
  backgroundColor: deepOrange[200],
  "&:hover": {
    backgroundColor: deepOrange[400],
  },
  borderColor: deepOrange[400],
  height: 50,
  margin: 5,
}));

export default DeleteButton;
