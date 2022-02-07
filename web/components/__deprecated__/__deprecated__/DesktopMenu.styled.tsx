import styled from 'styled-components';

export const StyledItem = styled.li`
  display: block;
  padding-left: 1rem;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledNav = styled.nav`
  display: none;
  visibility: hidden;

  @media ${({ theme }) => theme.breakpoints.desktop.query} {
    display: block;
    visibility: visible;
    height: 100%;
  }
`;
