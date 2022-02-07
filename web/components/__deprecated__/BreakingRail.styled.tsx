import styled from 'styled-components';

export const StyledCloseButton = styled.button`
  ${({ theme }) => theme.typography.button2};
  border: none;
  background-color: transparent;
  display: block;
  padding: 0 0 0 1.5em;
  margin: 0;
  cursor: pointer;

  :hover {
    opacity: 0.75;
  }
`;

export const StyledBreakingTag = styled.span`
  font-weight: bold;
`;

export const StyledTextLink = styled.a`
  ${({ theme }) => theme.typography.button1};
  text-decoration: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
`;

export const StyledContentContainer = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBreakingRail = styled.aside`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.status.alert.main};
`;
