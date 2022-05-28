import styled from "@emotion/styled";
import { keyframes } from "@mui/material";

export const LogoContainer = styled.img`
  width: 100%;
  max-width: 250px;
`;

export const PlacesContainer = styled.div`
  gap: 10px;
  height: 100%;
  display: flex;
  padding: 16px;
  overflow: auto;
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
