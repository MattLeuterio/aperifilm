import { css } from 'styled-components';

export const LineClamp = ({ numLines }) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${numLines};
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;