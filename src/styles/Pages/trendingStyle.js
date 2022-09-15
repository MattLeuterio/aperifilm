import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import theme from '../../theme';

export const TrendingContainer = styled.div`
`;

export const Container = styled.div`

  .tabs {
    margin: 50px 0 40px;
  }

`;

export const ResultsContainer = styled.div`
  display: flex;
`;

export const Left = styled.div`
  width: 70%;
  margin-right: 40px;

  .card {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

export const Right = styled.div`
  background-color: ${theme.colors.component.dark};
  border-radius: 5px;
  padding: 30px 30px 0;
  width: 30%;
  height: fit-content;
  max-height: fit-content;
`;

export const PeopleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
`;

export const Person = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90px;
  width: calc(50%);
  margin-bottom: 30px;
  cursor: pointer;

  .main-image {
    margin: 0 auto;
    width: 90px;
    height: 90px;
    aspect-ratio: 1/1;
    margin-bottom: 10px;
    img {
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;