import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import { drawerWidth } from "../../styles";

export const MapBox = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(0),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      marginLeft: `calc(100vw +  ${drawerWidth})`,
    }),
    // marginLeft: `${drawerWidth}px`,
    [theme.breakpoints.down("sm")]: {},
    display: "flex",
  }),
}));

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "500px",
    },
  },
}));

export const MapContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "100%",
  height: "100vh",
  marginLeft: open ? `${drawerWidth}px` : drawerWidth,
  [theme.breakpoints.up("sm")]: {
    marginLeft: "500px",
  },
}));
