import styled from "styled-components";

export const Container = styled.aside`
  width: 360px;
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.light.colors.background};
`;
