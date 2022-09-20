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

  @media ${theme.device.mobileM} {
    flex-direction: column-reverse;
  }
`;

export const Left = styled.div`
  width: 70%;
  margin-right: 20px;

  @media ${theme.device.mobileL} {
    margin-right: 10px;
  }

  @media ${theme.device.mobileM} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

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

  @media ${theme.device.mobileL} {
    width: 40%;
  }

  @media ${theme.device.mobileM} {
    width: 100%;
    margin-bottom: 40px;
  }
`;

export const PeopleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;

  @media ${theme.device.mobileL} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media ${theme.device.mobileM} {
    justify-content: center;
    flex-direction: row;
  }
`;

export const Person = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90px;
  width: calc(50%);
  margin-bottom: 30px;
  cursor: pointer;

  @media ${theme.device.mobileL} {
    width: unset;
  }

  @media ${theme.device.mobileM} {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }

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