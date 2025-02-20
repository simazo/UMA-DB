import styled from "styled-components";

export const HeadPrimary = styled.h1`
  padding: 0.5em;
  background: ${({ theme }) => theme.colors.neutral};
  border-left: solid 4px ${({ theme }) => theme.colors.tertiary};
`;

export const HeadSecondary = styled.h2`
  border-bottom: double 5px ${({ theme }) => theme.colors.tertiary};
`;
