import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex, LineClamp } from '../../js/Mixins';
import theme from '../../theme';

export const ProductDetailsContainer = styled.div`
`;

export const Container = styled.div`
  .tabs {
    margin: 40px 0 40px;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .card {
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;