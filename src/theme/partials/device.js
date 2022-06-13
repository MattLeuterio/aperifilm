export const breakpoint = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  tabletL: 950,
  laptop: 1024,
  desktop: 1480
};

const size = {
  mobileS: `${breakpoint.mobileS}px`,
  mobileM: `${breakpoint.mobileM - 1}px`,
  mobileL: `${breakpoint.mobileL - 1}px`,
  tablet: `${breakpoint.tablet - 1}px`,
  tabletL: `${breakpoint.tabletL - 1}px`,
  laptop: `${breakpoint.laptop - 1}px`,
  desktop: `${breakpoint.desktop - 1}px`
};

const device = {
  mobileS: `(max-width: ${size.mobileM})`,
  mobileM: `(max-width: ${size.mobileL})`,
  mobileL: `(max-width: ${size.tablet})`,
  tablet: `(max-width: ${size.tabletL})`,
  tabletL: `(max-width: ${size.laptop})`,
  laptop: `(max-width: ${size.desktop})`,
  desktop: `(min-width: calc(${size.desktop}) + 1px)`
};

export default device;
