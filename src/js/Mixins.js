import { css } from 'styled-components';

export const LineClamp = ({ numLines }) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${numLines};
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

export const DisplayFlex = ({ alignItems, justifyContent}) => css`
  display: flex;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
`;

export const BackgroundImage = ({ url, position, size}) => css`
  background-image: url(${url});
  background-position: ${position};
  background-size: ${size};
  background-repeat: no-repeat;
`;