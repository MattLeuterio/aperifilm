import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import theme from '../../theme';

export const UserListsContainer = styled.div`
`;

export const TabsContainer = styled.div`
  margin-top: 40px;
`;

export const ResultsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;

  .card {
    margin-bottom: 20px;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export const SelectsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;

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