import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme';

export const TypefaceInterface = PropTypes.shape({
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontStyle: PropTypes.oneOf(['normal', 'italic']),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  fontStretch: PropTypes.oneOf(['normal', 'condensed']),
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.number,
  textDecoration: PropTypes.string
});

const defaultConfig = {
  color: 'unset',
  fontFamily: theme.fontset.montserrat,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontStretch: 'normal',
  lineHeight: 1,
  letterSpacing: 'normal',
  fontSize: 14,
  textAlign: 'unset',
  textTransform: 'unset',
  textDecoration: 'underline'
};

const getTypefaceBaseStyle = (props) => `
  color: ${props.config.color || props.theme.colors.primary.black};
  font-family: ${props.config.fontFamily || props.theme.fontset.montserrat};
  font-size: ${props.config.fontSize}px;
  font-style: ${props.config.fontStyle};
  font-weight: ${props.config.fontWeight};
  font-stretch: ${props.config.fontStretch};
  letter-spacing: ${props.config.letterSpacing};
  line-height: ${props.config.lineHeight};
  text-align: ${props.config.textAlign};
  text-transform: ${props.config.textTransform};
  text-decoration: ${props.config.textDecoration}
  //transition: all 250ms ease-in-out;
`;

export const TypefaceStyledDiv = styled.div`
  ${props => getTypefaceBaseStyle(props)};
`;

export const TypefaceStyledSpan = styled.span`
  ${props => getTypefaceBaseStyle(props)};
  width: unset;
`;

const Typeface = ({
  configuration, children, htmlAttribute, onClick, className
}) => {
  const config = { ...defaultConfig, ...configuration };
  if (htmlAttribute === 'div') {
    return <TypefaceStyledDiv config={config} onClick={onClick} className={className}>{children}</TypefaceStyledDiv>;
  }
  return <TypefaceStyledSpan config={config} onClick={onClick} className={className}>{children}</TypefaceStyledSpan>;
};

Typeface.propTypes = {
  children: PropTypes.node,
  configuration: TypefaceInterface,
  htmlAttribute: PropTypes.oneOf(['div', 'span']),
  onClick: PropTypes.func
};

Typeface.defaultProps = {
  htmlAttribute: 'div'
};

export default Typeface;
