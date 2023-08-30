import styled, { css } from 'styled-components';
import Button from '.';
import theme from '../../theme';
export const ShareContainer = styled.div`
  position: relative;
  cursor: pointer;
  .icon-share {

    svg {
        transition: all .2s ease-in-out;
      }

      &:hover {
        svg {
          stroke: ${theme.colors.mainBrandColors.light};
          fill: ${theme.colors.base.blue};
          transform: scale(1.1) rotate(-8deg);
        }
      }
  }
`;