import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import theme from '../../theme';

export const SearchContainer = styled.div`
`;

export const Container = styled.div`
`;
export const Welcome = styled.div`
  position: relative;
  max-width: 834px;
  background-color: ${theme.colors.component.dark};
  border-radius: 20px;
  padding: 20px 40px 30px;
  margin: 30px auto;

  .welcome-close-icon {
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 18px;

    &:hover {
      svg {
        stroke: ${theme.colors.element.light};
      }
    }
  }
`;

export const WelcomeTitle = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 8px;

  .apericheers-red-icon {
    margin-right: 12px;
    height: 43px;
  }
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

export const Keyword = styled.div`
  cursor: pointer;
  border: 1px solid ${theme.colors.element.light};
  padding: 2px 4px;
  margin-bottom: 5px;
  border-radius: 3px;

  &:hover {
    background-color: ${theme.colors.mainBrandColors.dark};
    border: 1px solid ${theme.colors.mainBrandColors.dark};
  } 

  &:not(:last-child) {
    margin-right: 5px;
  }
`;