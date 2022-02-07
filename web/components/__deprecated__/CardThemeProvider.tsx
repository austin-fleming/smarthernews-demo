import { Quickreads as QuickreadsProps } from '@cms/types/sanityTypes';
import { ThemeProvider } from 'styled-components';

const buildTheme = (
  backgroundColor: string,
  borderColor: string,
  textColor: string,
  iconTheme: 'light' | 'dark'
) =>
  Object.freeze({
    backgroundColor,
    borderColor,
    iconTheme,
    textColor,
  });

const THEME_TABLE = Object.freeze({
  '--black': buildTheme('#1a1919', '#f8dbd5', '#ffffff', 'light'),
  '--bronze': buildTheme('#bf8a75', '#f8dbd5', '#ffffff', 'light'),
  '--dark-blue': buildTheme('#5f747a', '#f8dbd5', '#ffffff', 'light'),
  '--dark-brown': buildTheme('#7c7868', '#f8dbd5', '#ffffff', 'light'),
  '--dark-gray': buildTheme('#636466', '#f8dbd5', '#fafafa', 'light'),
  '--dark-green': buildTheme('#728678', '#f8dbd5', '#ffffff', 'light'),
  '--dark-pink': buildTheme('#99716d', '#f8dbd5', '#ffffff', 'light'),
  '--dark-purple': buildTheme('#6c5f6d', '#f8dbd5', '#ffffff', 'light'),
  '--light-blue': buildTheme('#cadddf', '#6c816f', '#1a1919', 'dark'),
  '--light-gray': buildTheme('#e6e7e8', '#99716d', '#2c453b', 'dark'),
  '--light-green': buildTheme('#d2e3d7', '#6c5f6d', '#2c453b', 'dark'),
  '--light-pink': buildTheme('#f8dbd5', '#6c816f', '#2c453b', 'dark'),
  '--light-purple': buildTheme('#d7cad8', '#6c816f', '#2c453b', 'dark'),
  '--light-yellow': buildTheme('#f7f4df', '#6c816f', '#2c453b', 'dark'),
  '--medium-gray': buildTheme('#939497', '#f8dbd5', '#fafafa', 'light'),
  '--white': buildTheme('#fafafa', '#99716d', '#2c453b', 'dark'),
});

const CARD_ICONS = Object.freeze({
  dark: 'brandicons/sh_sunglasses_sage.png',
  light: 'brandicons/sh_sunglasses_white.png',
});

const createCardTheme = (colorpaletteclassname: QuickreadsProps['colorpaletteclassname']) => {
  const palette = THEME_TABLE[colorpaletteclassname];
  const borderWidth = '1px';

  return Object.freeze({
    card: {
      borderWidth,
      cardBorder: `${borderWidth} solid ${palette.borderColor}`,
      icon: CARD_ICONS[palette.iconTheme],
      imageOpacity: 0.15,
      palette,
      textSize: '16px',
    },
  });
};

export const CardThemeProvider = ({
  cardTheme = '--light-blue',
  children,
}: {
  cardTheme: QuickreadsProps['colorpaletteclassname'];
  children: any;
}) => {
  const theme = createCardTheme(cardTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
