import type { HeaderSingleton } from '@cms/types/sanityTypes';
import { NavLink } from '@components/common';
import { LinkItem, LinkList, NavDrawer } from './MobileMenu.styled';

export const MobileMenu = ({
  settings,
  menuState,
}: {
  menuState: boolean;
  settings: HeaderSingleton;
}) => (
  <NavDrawer isOpen={menuState}>
    <LinkList>
      {settings?.headerNavigation &&
        settings.headerNavigation.map((link) => (
          <LinkItem key={link.label}>
            {/* ESNOTE: [future] cleanup how links are handled. */
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /* @ts-ignore */}
            <NavLink fillContainer link={link} />
          </LinkItem>
        ))}
    </LinkList>
  </NavDrawer>
);
