import styled from "styled-components";

export const Container = styled.aside`
  width: 360px;
  height: 100vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.light.colors.background};
`;

export const SearchArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
