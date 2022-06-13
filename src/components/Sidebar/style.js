import styled from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import theme from '../../theme';

export const SidebarContainer = styled.header`
  position: fixed;
  top: 0;
  left: auto;
  background-color: red;
  width: ${sidebarWidthDSK};
  min-height: 100vh;
`; 