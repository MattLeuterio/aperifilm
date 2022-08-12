import styled, { css } from 'styled-components';
import Button from '.';
import theme from '../../theme';

export const StatisticsRowCardContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;

  > div:not(:last-child) {
    margin-right: 12px;
  }
`;

export const StatsWrapper = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 5px;
  }
`;