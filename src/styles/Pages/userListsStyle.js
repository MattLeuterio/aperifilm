import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex } from '../../js/Mixins';
import theme from '../../theme';

export const UserListsContainer = styled.div`
`;

export const TabsContainer = styled.div`
  margin-top: 40px;

  @media ${theme.device.mobileM} {
    > div {
      flex-wrap: wrap;

      > div:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  @media ${theme.device.mobileS} {
    > div {
      flex-wrap: nowrap;
      flex-direction: column;
      width: 100%;

      > div {
        width: 100%;
      }
      > div:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;

  @media ${theme.device.mobileM} {
    justify-content: center;
  }

  .card {
    margin-bottom: 20px;
    &:not(:last-child) {
      margin-right: 20px;

      @media ${theme.device.mobileM} {
        margin-right: 0;
      }
    }
  }
`;

export const FiltersContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${theme.device.tablet} {
    flex-direction: column-reverse;
    align-items: flex-start;

    & > div:not(:last-child) {
      margin-right: 0;
      margin-top: 20px;
    }
  }

  & > div:not(:last-child) {
    margin-right: 10px;    
  }

  .mui-select-pers {
    min-width: 160px;
    height: 30px;
    padding: 0;

    .MuiInputBase-root {
      border-radius: 4px;

      .MuiSelect-select {
        border: 1px solid ${theme.colors.element.light};
        color: ${theme.colors.element.light};
      }
    }
  }
`;

export const PageMainContainer = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
`;

export const Main = styled.div`
  width: 100%;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 30%;
  min-width: 260px;
  max-width: 260px;

  @media ${theme.device.mobileM} {
    width: 100%;
    min-width: unset;
    max-width: unset;
  }

  > div.icn-search {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

export const SearchInput = styled.input`
  position: relative;
  padding: 10px 40px 10px 20px;
  width: 100%;
  height: 35px;
  color: ${theme.colors.element.light};
  background: ${theme.colors.component.light};
  border: none;
  border-radius: 8px;

  /* @media ${theme.device.tabletL} {
    font-size: 56px;
  } */

  &:focus {
    outline: 0;
  }

`;