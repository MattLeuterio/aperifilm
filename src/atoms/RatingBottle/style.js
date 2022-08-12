import styled, { css } from 'styled-components';
import theme from '../../theme';
import RatingBottle from './index';
import Button from './index';

export const Container = styled.div`
  display: flex;
  background: ${theme.colors.element.light};
  width: fit-content;
  justify-content: space-between;
  border-radius: 300px;
  align-items: center;
  
  ${props => {
    switch (props.size) {
      
      case RatingBottle.SIZE.MEDIUM:
        default:
          return css`
          padding: 7px 25px;
          width: 120px;
          height: 36px;
        `;

      case RatingBottle.SIZE.SMALL:
        return css`
          padding: 6px 20px;
          width: 92px;
          height: 28px;
        `;
    }
  }};
`;