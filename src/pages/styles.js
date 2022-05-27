import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const LogoContainer = styled.img`
  width: 100%;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
`;

export const PlacesContainer = styled(Grid)(({ theme }) => ({
  height: "59vh",
  overflow: "auto",
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.1em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
}));
