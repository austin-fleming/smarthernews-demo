import styled from 'styled-components';

export const StyledCloseButton = styled.button`
  ${({ theme }) => theme.typography.button2};
  border: none;
  color: white;
  background-color: transparent;
  display: block;
  padding: 0;
  margin: 0;
  cursor: pointer;
  padding: 0 0 0 1.5em;

  :hover {
    opacity: 0.75;
  }
`;

export const StyledTextLink = styled.a`
  ${({ theme }) => theme.typography.button2};
  color: ${({ theme }) => theme.palette.white.main};
  text-decoration: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledContentContainer = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const StyledNotificationRail = styled.aside`
  background-color: ${({ theme }) => theme.palette.background.contrastText};
`;
