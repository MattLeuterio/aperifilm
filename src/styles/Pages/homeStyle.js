import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import theme from '../../theme';

export const HomeContainer = styled.div`
`;

export const Container = styled.div`
`;
export const Welcome = styled.div`
  position: relative;
  max-width: 834px;
  background-color: ${theme.colors.component.dark};
  border-radius: 20px;
  padding: 20px 40px 30px;
  margin: 30px auto;

  .welcome-close-icon {
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 18px;

    &:hover {
      svg {
        stroke: ${theme.colors.element.light};
      }
    }
  }
`;

export const WelcomeTitle = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 8px;

  .apericheers-red-icon {
    margin-right: 12px;
    height: 43px;
  }
`;

export const WelcomeDescription = styled.div`
`;