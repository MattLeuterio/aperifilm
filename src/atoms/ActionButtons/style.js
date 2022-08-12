import styled, { css } from 'styled-components';
import Button from '.';
import theme from '../../theme';

export const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;

  div:not(:last-child) {
    margin-right: 6px;
  }
`;