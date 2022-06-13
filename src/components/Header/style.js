import styled from 'styled-components';
import { HeaderHeightDSK, HeaderWidthDSK } from '../../../const';
import theme from '../../theme';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background-color: blue;
  width: ${HeaderWidthDSK};
  height: ${HeaderHeightDSK};
  z-index: ${theme.zIndex.header};
`; 
