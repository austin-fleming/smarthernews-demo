import styled from 'styled-components';

export const LinkItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-bottom: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
`;

export const LinkList = styled.ul`
  width: 100%;
`;

export const NavDrawer = styled.nav<{ isOpen: boolean }>`
  visibility: visible;
  display: block;

  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: ${({ theme }) => theme.layout.navHeight(1)};
  overflow-y: hidden;

  background-color: ${({ theme }) => theme.palette.background.main};
  border-bottom: ${({ theme }) => theme.borders.main};

  transition: ${({ theme }) => theme.transitions.main};
  height: ${({ isOpen }) => (isOpen ? `auto` : '0%')};

  ${({ isOpen }) =>
    isOpen && `box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;`};

  @media ${({ theme }) => theme.breakpoints.desktop.query} {
    display: none;
    visibility: hidden;
  }
`;
