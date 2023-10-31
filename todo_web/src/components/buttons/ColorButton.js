import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[200]),
  "&:hover": {
    backgroundColor: orange[500],
  },
  borderColor: orange[500],
  height: 50,
  margin: 5,
  fontSize: "12px", // 使用clamp函数调整字体大小
}));

export default ColorButton;
