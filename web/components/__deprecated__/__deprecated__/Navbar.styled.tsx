import styled from 'styled-components';

export const StyledLogoBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: ${({ theme }) => `${theme.layout.spacing(1)} 0`};
`;

export const StyledToolbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledNavbar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-bottom: ${({ theme }) => theme.borders.main};
  background-color: ${({ theme }) => theme.palette.background.main};
  z-index: ${({ theme }) => theme.zIndex.headerPrimary};
  height: ${({ theme }) => theme.layout.navHeight(1)};
`;

export const StyledHeader = styled.header`
  position: sticky;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.headerPrimaryBeta};
`;
