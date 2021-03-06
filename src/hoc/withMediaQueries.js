// High-order components must use the spreading operator
// to pass the props down to the real one.
/* eslint-disable react/jsx-props-no-spreading */
import React, { useLayoutEffect, useState } from 'react';

const breakpoint = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  tabletL: 950,
  laptop: 1024,
  desktop: 1480
};


const defaultMediaQueries = {
  mediaIsPhone: false,
  mediaIsTablet: false,
  mediaIsLaptop: false,
  mediaIsDesktop: false
};

const defaultScreenSize = {
  height: window.innerHeight,
  width: window.innerWidth
};

export function withMediaQueries(LazyComp) {
  const WithMediaQueries = (props) => {
    const [mediaQueries, setMediaQueries] = useState(defaultMediaQueries);
    const [screenSizes, setScreenSizes] = useState(defaultScreenSize);

    useLayoutEffect(() => {
      function updateSize() {
        setMediaQueries({
          ...mediaQueries,
          mediaIsPhone: window.innerWidth >= breakpoint.mobileS && window.innerWidth < breakpoint.tablet,
          mediaIsTablet: window.innerWidth >= breakpoint.tablet && window.innerWidth < breakpoint.laptop,
          mediaIsLaptop: window.innerWidth >= breakpoint.laptop && window.innerWidth < breakpoint.desktop,
          mediaIsDesktop: window.innerWidth >= breakpoint.desktop
        });

        setScreenSizes({
          ...screenSizes,
          height: window.innerHeight,
          width: window.innerWidth
        });
      }

      window.addEventListener('resize', updateSize);
      updateSize();

      return () => window.removeEventListener('resize', updateSize);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <LazyComp {...props} {...mediaQueries} {...screenSizes} />
    );
  };

  WithMediaQueries.displayName = `WithMediaQueries(${LazyComp.displayName || LazyComp.name || 'Component'})`;

  return WithMediaQueries;
}
