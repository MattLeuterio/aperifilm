import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex, LineClamp } from '../../js/Mixins';
import theme from '../../theme';

export const DiscoverContainer = styled.div``;

export const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;

  @media ${theme.device.mobileL} {
    justify-content: center;
  }

  .card {
    margin-bottom: 20px;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;