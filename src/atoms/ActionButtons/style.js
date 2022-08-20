import styled, { css } from 'styled-components';
import Button from '.';
import { DisplayFlex } from '../../js/Mixins';
import theme from '../../theme';

export const ActionButtonsContainer = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
  width: fit-content;
  height: fit-content;

  div:not(:last-child) {
    margin-right: 6px;
  }
`;