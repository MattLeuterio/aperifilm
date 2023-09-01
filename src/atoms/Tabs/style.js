import styled, { css } from 'styled-components';
import Button from '.';
import { DisplayFlex } from '../../js/Mixins';
import theme from '../../theme';

export const TabsContainer = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
  width: fit-content;
  height: fit-content;
  transition: all .2s ease-in-out;

  > div {

    &.active {
      &:hover {
        background-color: ${theme.colors.mainBrandColors.dark};
      }  
    }
    &:hover {
      background-color: ${theme.colors.component.dark};
    }  
  }

  div:not(:last-child) {
    margin-right: 6px;
  }
`;