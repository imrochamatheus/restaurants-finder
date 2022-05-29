import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const Container = styled.div`
  display: flex;
  background-color: #fff;
`;

export const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform .2s ease-out;",
  padding: 0,
  "&:hover": {
    transform: "scale(1.05)",
  },
}));
