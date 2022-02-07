import styled from 'styled-components';

export const Line = styled.path`
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 300ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Line01 = styled(Line)<{ isOpen: boolean }>`
  stroke-dasharray: 60 207;
  stroke-width: 6;

  ${({ isOpen }) =>
    isOpen &&
    `
    stroke-dasharray: 90 207;
    stroke-dashoffset: -134;
    stroke-width: 6;
  `}
`;

export const Line02 = styled(Line)<{ isOpen: boolean }>`
  stroke-dasharray: 60 60;
  stroke-width: 6;

  ${({ isOpen }) =>
    isOpen &&
    `
    stroke-dasharray: 1 60;
    stroke-dashoffset: -30;
    stroke-width: 6;
  `}
`;

export const Line03 = styled(Line)<{ isOpen: boolean }>`
  stroke-dasharray: 60 207;
  stroke-width: 6;

  ${({ isOpen }) =>
    isOpen &&
    `
    stroke-dasharray: 90 207;
    stroke-dashoffset: -134;
    stroke-width: 6;
  `}
`;

export const HamburgerContainer = styled.button`
  visibility: visible;
  position: relative;
  width: 40px;
  height: 40px;

  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;

  z-index: ${({ theme }) => theme.zIndex.overlay};

  @media ${({ theme }) => theme.breakpoints.desktop.query} {
    display: none;
    visibility: hidden;
  }
`;
