import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  "&:hover": {
    backgroundColor: pink[700],
  },
  margin: 5,
}));

export default DeleteButton;