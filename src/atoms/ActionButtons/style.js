import styled from 'styled-components';
import { DisplayFlex } from '../../js/Mixins';

export const ActionButtonsContainer = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
  width: fit-content;
  height: fit-content;

  div:not(:last-child) {
    margin-right: 6px;
  }
`;