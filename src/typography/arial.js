import React from 'react';
import PropTypes from 'prop-types';
import Typeface, { TypefaceInterface } from './index';
import { FontBase } from '../../const';
import theme from '../theme';
import { withMediaQueries } from '../../hoc/withMediaQueries';

const baseConfig = {
  color: 'unset',
  fontFamily: theme.fontset.arial,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: 'unset',
  fontSize: FontBase
};

const types = {
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: 700
  },
  boldItalic: {
    fontStyle: 'italic',
    fontWeight: 700
  },
  h1: {
    fontSize: 21,
    fontWeight: 500
  },
  h2: {
    color: theme.colors.primary.black,
    fontSize: 18,
    fontWeight: 500
  },
  h3: {
    fontSize: 14,
    lineHeight: 1.14
  }
};

const Arial = ({
  type, configuration, children, htmlAttribute, onClick, mediaIsDesktop, mediaIsLaptop
}) => {
  const finalConfiguration = { ...baseConfig, ...types[type], ...configuration };
  return (
    <Typeface
      htmlAttribute={htmlAttribute}
      configuration={mediaIsDesktop || mediaIsLaptop ? { ...finalConfiguration, fontSize: finalConfiguration.fontSize } : { ...finalConfiguration }}
      onClick={onClick}
    >{children}
    </Typeface>
  );
};

Arial.propTypes = {
  htmlAttribute: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(Object.keys(types)),
  configuration: TypefaceInterface,
  onClick: PropTypes.func
};

export default withMediaQueries(Arial);
