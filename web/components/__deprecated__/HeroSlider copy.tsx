import { useState, MouseEvent, MouseEventHandler } from 'react';
import { getImage } from '@cms/images/urlFor';
import type { Videoposts as VideopostsProps } from '@cms/types/sanityTypes';
import { BreakingTag } from '@components/ui';
import { useKeenSlider } from 'keen-slider/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { ArrowLeft, ArrowRight } from './Arrows';
import { Slide, SlideLinkWrapper, StyledSummary, StyledTitle, TextBox } from './HeroSlider.styled';

// TODO: add slider buttons
// TODO: appear buttons have broken
export const HeroSlider = ({ videoposts }: { videoposts: VideopostsProps[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(s) {
      const slideNumber = s.details().relativeSlide;
      setCurrentSlide(slideNumber);
    },
    slidesPerView: 1,
  });

  return (
    <div ref={sliderRef} className='keen-slider'>
      {videoposts.map((videopost) => (
        <Slide
          key={videopost._id}
          as='article'
          className='keen-slider__slide'
          isBreaking={!!videopost.isBreaking || !!videopost.isBreakingDropdown}>
          <NextLink passHref href={`/${videopost._type}/${videopost.slug.current}`}>
            <SlideLinkWrapper>
              <NextImage
                priority
                alt={videopost.mainimage.alt || 'article image'}
                blurDataURL='/placeholder-image.jpg'
                layout='fill'
                objectFit='cover'
                placeholder='blur'
                src={getImage(videopost.mainimage).width(1000).height(1000).url()}
              />
              <TextBox>
                {(videopost.isBreaking || videopost.isBreakingDropdown) && <BreakingTag />}
                <StyledTitle>{videopost.title}</StyledTitle>
                {videopost.summary && <StyledSummary>{videopost.summary}</StyledSummary>}
              </TextBox>
            </SlideLinkWrapper>
          </NextLink>
        </Slide>
      ))}
      {slider && (
        <>
          <ArrowLeft onClickFn={() => slider.prev()} />
          <ArrowRight onClickFn={() => slider.next()} />
        </>
      )}
    </div>
  );
};
