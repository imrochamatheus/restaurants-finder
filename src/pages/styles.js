import styled from "@emotion/styled";
import { Box, keyframes, TextField } from "@mui/material";

export const Main = styled.main`
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
`;

export const SearchContainer = styled(Box)(({ theme }) => ({
  padding: "8px 32px",
  textAlign: "center",
  background: "#fff",
  display: "flex",
  gap: "16px",
  flexDirection: "column",
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  border: "none",

  "&:focus": {
    border: "none !important",
    outline: "none !important",
  },
}));

export const LogoContainer = styled.img`
  width: 100%;
  max-width: 125px;
  align-self: center;
`;

export const PlacesContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 16px;
  overflow: auto;
  justify-content: flex-start;
  flex-direction: column;
`;

export const LoaderContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Rotate = styled.img`
  display: inline-block;
  animation: ${rotate} 10s linear infinite;
  padding: 5px;
  font-size: 1.2rem;
  position: "absolute";
  margin-top: -200px;
  margin-left: -200px;
`;
