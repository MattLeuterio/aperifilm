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