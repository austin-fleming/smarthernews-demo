import styled from 'styled-components';
import type { WidthProps } from './types';

export type StyledContainerProps = {
  center?: boolean;
  fullHeight?: boolean;
  fullVH?: boolean;
  noPadVertical?: boolean;
  vertical?: boolean;
  width?: WidthProps;
};

export const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  max-width: ${({ width }) =>
    (width === 'full' && '100%') || (width === 'narrow' && '60ch') || '100%'};

  ${({ fullHeight }) => fullHeight && 'height: 100%;'};
  ${({ fullVH }) => fullVH && `min-height: 100vh;`}

  margin: auto;

  ${({ noPadVertical, theme }) =>
    noPadVertical
      ? `padding: 0 ${theme.layout.siteGutter(1)};`
      : `padding: ${theme.layout.siteGutter(1)};`}

  ${({ vertical }) =>
    vertical &&
    `
    display: flex;
    flex-direction: column;
  `}

  ${({ center }) =>
    center &&
    `
        display: flex;
        flex-direction: column;
        align-items: center;
    `}

  @media ${({ theme }) => theme.breakpoints.mobileLg.query} {
    width: ${({ theme }) => theme.breakpoints.mobileLg.width};
  }

  @media ${({ theme }) => theme.breakpoints.tablet.query} {
    width: ${({ theme }) => theme.breakpoints.tablet.width};
  }

  @media ${({ theme }) => theme.breakpoints.desktop.query} {
    width: ${({ theme }) => theme.breakpoints.desktop.width};
  }

  @media ${({ theme }) => theme.breakpoints.desktopLg.query} {
    width: ${({ theme }) => theme.breakpoints.desktopLg.width};
  }
`;
