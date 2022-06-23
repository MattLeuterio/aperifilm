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
  display: flex;
  align-items: center;
`;
export const UserWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;
export const UserImageWrapper = styled.div`
  cursor: pointer;
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
  cursor: pointer;
  margin: 0 5px 0 10px;
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: 38px;
  left: 0;
  min-width: 130px;
  padding: 10px 7px;
  border-radius: 5px;
  background-color: ${theme.colors.component.light};
`;

export const SettingButton = styled.div`
  cursor: pointer;
  display: flex;
  font-size: 12px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  > div:first-child {
    margin-right: 6px;
  }
`;

export const LanguageWrapper = styled.div`
  position: relative;
  margin-left: 40px;
`;

export const ImageWrap = styled.div`
  cursor: pointer;
  border-radius: 2px;
  overflow: hidden;
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  min-width: 190px;
  padding: 10px 7px;
  border-radius: 5px;
  background-color: ${theme.colors.component.light};
`;

export const LDropSection = styled.div`

&:not(:last-child) {
  margin-bottom: 20px;
}

`;
export const LDropTitle = styled.div`
  display: flex;
  align-items: center;

  > div:first-child {
    margin-right: 4px;
  }
`;

export const SelectCtn = styled.div`
  margin-top: 10px;
`;

