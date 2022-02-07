import React, { ForwardedRef, forwardRef, useContext, useEffect, useState } from 'react';
import { Quickreads as QuickreadsProps } from '@cms/types/sanityTypes';
import { QuickreadPortableText } from '@components/articles';
import { AspectImage } from '@components/ui';
import NextImage from 'next/image';
import styled, { css, ThemeProvider, useTheme } from 'styled-components';
import { Checkmark } from './Checkmark';
import { CardText } from './Typography.styled';

// injection point for portable text
const CARD_BORDER_WIDTH = '1px';
const CARD_BORDER = `${CARD_BORDER_WIDTH} solid black`;

/* Typography */
const gammaRegular = css`
  font-family: 'Quattrocento Sans', sans-serif;
  font-weight: 400;
`;

const iconLight = 'url("/img/sh_sunglasses_white.png")';
const iconDark = 'url("/img/sh_sunglasses_sage.png")';

const Citation = styled.p`
  display: inline-block;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const BodyText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Category = styled.h3`
  &&& {
    text-align: center;
    white-space: nowrap;
    padding: 0 ${({ theme }) => theme.layout.cardPadding(0.5)};

    font-size: 12px;
    ${gammaRegular}
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1;
    margin: 0;
  }
`;

const BorderPiece = styled.span`
  width: 100%;
  height: ${({ theme }) => theme.card.borderWidth};
  background-color: ${({ theme }) => theme.card.palette.borderColor};
`;

const BorderElements = styled.div<{ isLower: boolean }>`
  position: absolute;

  height: ${({ theme }) => theme.layout.cardPadding(2)};
  margin: ${({ theme, isLower }) =>
    isLower
      ? `auto auto ${theme.layout.cardPadding(-1)} auto`
      : `${theme.layout.cardPadding(-1)} auto auto auto`};

  width: 100%;
  ${({ isLower }) => (isLower ? `bottom: 0` : `top: 0`)};
  ${({ isLower }) => (isLower ? `top: auto` : `bottom: auto`)};
  left: 0;
  right: 0;
  padding: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const BorderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  padding: ${({ theme }) => theme.layout.cardPadding(1)};
  border-left: ${({ theme }) => theme.card.cardBorder};
  border-right: ${({ theme }) => theme.card.cardBorder};
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: ${({ theme }) => theme.card.imageOpacity};
  height: 100%;
  width: 100%;
`;

const BodyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  padding: ${({ theme }) => theme.layout.cardPadding(1)};
`;

const Frame = styled.div`
  width: 100%;
  height: 100%;
`;

const FrameUpper = styled(Frame)``;
const FrameLower = styled(Frame)``;

const StyledCard = styled(CardText)`
  width: ${({ theme }) => theme.layout.cardWidth(1)};
  height: 450px;

  background-color: ${({ theme }) => theme.card.palette.backgroundColor};

  pointer-events: none;

  @media ${({ theme }) => theme.breakpoints.mobileLg.query} {
    height: ${({ theme }) => theme.layout.cardWidth(1)};
  }
`;

type PageProps = {
  isCurrent?: boolean;
  isNext?: boolean;
  isPrevious?: boolean;
  pageContent: QuickreadsProps;
  stackIndex: number;
};

// TODO: showCheckmark functionality
// TODO: pass series name
// TODO: can I show without duplicating?
// eslint prefer-arrow-callback: 'off'
const PageForwardRef = (
  { pageContent, stackIndex, isCurrent = false, isPrevious = false, isNext = false }: PageProps,
  ref: React.ForwardedRef<Text>
) => {
  const [isHidden, setIsHidden] = useState(false);

  const theme = useTheme();

  const imageSizes = `
    (max-width: ${theme.breakpoints.mobileLg.width}) 100vw,
    (max-width: ${theme.breakpoints.tablet.width}) 50vw,
    (max-width: ${theme.breakpoints.desktop.width}) 33vw,
    (max-width: ${theme.breakpoints.desktopLg.width}) 25vw,
    20vw
`;

  const { cards, series, mainimage, colorpaletteclassname } = pageContent;

  const { showCheckmark, body, citation } = cards[stackIndex];

  if (isHidden) return null;

  return (
    <StyledCard ref={ref} data-density='hard'>
      <FrameUpper>
        <BodyContainer>
          {stackIndex === 0 && mainimage && (
            <ImageWrapper>
              <AspectImage fillContainer image={mainimage} sizes={imageSizes} />
            </ImageWrapper>
          )}
          <BorderWrapper>
            <BorderElements isLower={false}>
              <BorderPiece />
              <Category>{series.title}</Category>
              <BorderPiece />
            </BorderElements>

            <ContentContainer>
              {showCheckmark && <Checkmark />}
              <BodyText>{body && <QuickreadPortableText body={body} />}</BodyText>
              {citation && <Citation>{citation}</Citation>}
            </ContentContainer>

            <BorderElements isLower>
              <BorderPiece />
              <Category>{series.title}</Category>
              <BorderPiece />
            </BorderElements>
          </BorderWrapper>
        </BodyContainer>
      </FrameUpper>
      <FrameLower />
    </StyledCard>
  );
};

export const Page = forwardRef(PageForwardRef);
