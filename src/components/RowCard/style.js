import styled, { css } from 'styled-components';
import { 
  maxWidth, sidebarWidthDSK,  HeaderHeightDSK, HeaderHeightMOB 
} from '../../../const';

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
          justify-content: flex-start;

          .card:not(:last-child) {
            margin-right: 25px;
          }
        `;

      case RowCards.TYPE.DISCOVER:
        return css`
          justify-content: flex-start;

          .card:not(:last-child) {
            margin-right: 20px;
          }
        `;

      case RowCards.TYPE.PERSON:
        return css`
          justify-content: flex-start;

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

