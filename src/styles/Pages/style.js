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

export const Row = styled.div`
  margin-top: 40px;

  .goto-rowcard {
    margin: 0 auto;
    margin-top: 20px;
    width: fit-content;
  }

  .goto-rowcard-mobile {
    margin-left: auto;
    width: fit-content;
    margin-top: 15px;
  }
`;

export const RowHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RowCards = styled.div`
  display: flex;

  ${props => {
    switch (props.type) {
      case RowCards.TYPE.DEFAULT:
      default:
        return css`
          justify-content: space-between;

          .card:not(:last-child) {
            margin-right: 25px;
          }
        `;

      case RowCards.TYPE.DISCOVER:
        return css`
          justify-content: space-between;

          .card:not(:last-child) {
            margin-right: 20px;
          }
        `;

      case RowCards.TYPE.PERSON:
        return css`
          justify-content: space-between;

          .card:not(:last-child) {
            margin-right: 10px;
          }
        `;

      case RowCards.TYPE.TRENDING:
        return css`
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        `;
    }
  }};
`;
