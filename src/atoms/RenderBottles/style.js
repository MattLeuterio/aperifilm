import styled, { css } from 'styled-components';
import RenderBottles from './index';
import Logo from './index';

export const BottleRender = styled.div`
  display: inline-block;
  background-image: url(${props => props.srcBg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  ${props => {
    switch (props.size) {

      case RenderBottles.SIZE.MEDIUM:
      default:
        return css`
          width: 10px;
          height: 21px;
        `;

      case RenderBottles.SIZE.SMALL:
        return css`
          width: 7px;
          height: 15px;
        `;
    }
  }};
`;
