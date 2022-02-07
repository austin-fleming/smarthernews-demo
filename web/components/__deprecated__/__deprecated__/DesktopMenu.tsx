import type { HeaderSingleton } from '@cms/types/sanityTypes';
import { NavLink } from '@components/common';
import { StyledItem, StyledList, StyledNav } from './DesktopMenu.styled';

export const DesktopMenu = ({ headerNavigation }: HeaderSingleton) => (
  <StyledNav>
    <StyledList>
      {headerNavigation.map((link) => (
        <StyledItem key={link.label}>
          {/* ESNOTE: [future] cleanup how links are handled. */
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore */}
          <NavLink key={link.label} link={link} />
        </StyledItem>
      ))}
    </StyledList>
  </StyledNav>
);
