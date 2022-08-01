import React from 'react';
import PropTypes from 'prop-types';
import Typeface, { TypefaceInterface } from './index';
import { FontBase } from '../../const';
import theme from '../theme';

const baseConfig = {
  color: 'unset',
  fontFamily: theme.fontset.montserrat,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: 'normal',
  textDecoration: 'none',
  fontSize: FontBase
};

const types = {
  light: {
    fontWeight: 300
  },
  medium: {
    fontWeight: 500
  },
  bold: {
    fontWeight: 700
  },
  italic: {
    fontStyle: 'italic'
  },
  h1: {
    fontSize: 22,
    fontWeight: 500
  },
  h2: {
    fontSize: 18,
    fontWeight: 500
  },
  h3: {
    fontSize: 16,
    fontWeight: 400
  },
  h4: {
    fontSize: 14,
    fontWeight: 400
  },
  small: {
    fontSize: 12
  },
  xsmall: {
    fontSize: 10
  },
  error: {
    fontSize: 12
  },
  titlePage: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '39px'
  },
  link: {
    textDecoration: 'underline',
    fontWeight: 700
  },
  settingButton: {
    fontSize: 12,
    lineHeight: 1.5,
    color: theme.colors.element.dark
  },
  sidebarMenuSectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: theme.colors.base.darkGray,
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  }
};

const Montserrat = ({
  type,
  configuration,
  children,
  htmlAttribute,
  onClick,
  mediaIsDesktop,
  mediaIsLaptop
}) => {
  const finalConfiguration = {
    ...baseConfig,
    ...types[type],
    ...configuration
  };
  return (
    <Typeface
      htmlAttribute={htmlAttribute}
      configuration={
        mediaIsDesktop || mediaIsLaptop
          ? { ...finalConfiguration, fontSize: finalConfiguration.fontSize }
          : { ...finalConfiguration }
      }
      onClick={onClick}
    >
      {children}
    </Typeface>
  );
};

Montserrat.propTypes = {
  htmlAttribute: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(Object.keys(types)),
  configuration: TypefaceInterface,
  onClick: PropTypes.func
};

export default Montserrat;
