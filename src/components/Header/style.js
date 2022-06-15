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

export const ActionWrapper = styled.div`
  user-select: none;
`;
export const UserWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export const UserImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  background-color: ${theme.colors.component.light};
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserName = styled.div`
  margin: 0 5px 0 10px;
`;