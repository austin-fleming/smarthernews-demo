import { useIsBrowser } from '@lib/utils';
import { useState, useEffect, createContext, useContext } from 'react';
import { useTheme } from 'styled-components';

/* export const UseBreakpoint = () => {
  if (!useIsBrowser()) return null

  const {breakpoints} = useTheme()

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowSize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowSize)
    return () => window.removeEventListener('resize', handleWindowSize)
  }, [])

  return {
    mobileLg: width > theme.break
  }
} */

const defaultValues = Object({
  mobileLg: true,
  tablet: false,
  desktop: false,
  desktopLg: false,
});

const breakpointContext = createContext(defaultValues);

export const BreakpointsProvider = ({ children }: { children: any }) => {
  const { breakpoints } = useTheme();

  const [isBrowser, setIsBrowser] = useState(useIsBrowser()); // deal with NextJS issue regarding window
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : breakpoints.desktop);
  const [queries, setQueries] = useState(defaultValues);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);

    setQueries({
      mobileLg: width >= breakpoints.mobileLg.numericWidth,
      tablet: width >= breakpoints.tablet.numericWidth,
      desktop: width >= breakpoints.desktop.numericWidth,
      desktopLg: width >= breakpoints.desktopLg.numericWidth,
    });
  };

  useEffect(() => {
    setIsBrowser(useIsBrowser());

    if (isBrowser) {
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  return (
    <breakpointContext.Provider value={{ width, breakpoints: queries }}>
      {children}
    </breakpointContext.Provider>
  );
};

export const useBreakpoints = () => {
  const { width, breakpoints } = useContext(breakpointContext);
  return { width, breakpoints };
};

export const useTabletBreakpoint = () => {
  const { breakpoints } = useBreakpoints();

  return breakpoints.tablet;
};
