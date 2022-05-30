import { styled } from "@mui/material/styles";

export const CustomButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: "absolute",
  bottom: " 2rem",
  left: " 0.5rem",
  width: "4rem",
  background: "none",
  border: "none",
  zIndex: "10",
  cursor: "pointer",

  ...(open && {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }),
}));
