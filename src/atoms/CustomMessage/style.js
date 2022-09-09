import styled, { css } from 'styled-components';
import Button from '.';
import { DisplayFlex } from '../../js/Mixins';
import theme from '../../theme';

export const CustomMessageContainer = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
  width: fit-content;
  height: fit-content;
  background-color: ${theme.colors.component.dark};
  color: ${theme.colors.element.dark};
  padding: 5px 15px;
  border-radius: 40px;
  font-size: 12px;
  margin-bottom: 15px;

  div:not(:last-child) {
    margin-right: 6px;
  }
`;