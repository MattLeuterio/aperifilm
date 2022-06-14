import styled from 'styled-components';
import { HeaderHeightDSK, HeaderWidthDSK } from '../../../const';
import theme from '../../theme';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: ${HeaderWidthDSK};
  height: ${HeaderHeightDSK};
  z-index: ${theme.zIndex.header};
`;