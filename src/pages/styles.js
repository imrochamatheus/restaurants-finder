import styled from "@emotion/styled";
import { keyframes } from "@mui/material";

export const LogoContainer = styled.img`
  width: 100%;
  max-width: 250px;
`;

export const PlacesContainer = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
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
