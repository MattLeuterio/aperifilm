import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex, LineClamp } from '../../js/Mixins';
import theme from '../../theme';

export const ProductDetailsContainer = styled.div`
`;

export const Container = styled.div`
  .tabs {
    margin: 40px 0 40px;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .card {
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const MediaSectionGalleryImages = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
  margin-top: 20px;
  flex-wrap: wrap;
  .gallery-images-image {
    margin-bottom: 20px;
    width: calc(100% / 3 - 20px);
    img {
      border-radius: 20px;
    }

    &:nth-child(1), &:nth-child(2) {
      width: calc(50% - 20px);
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export const MediaSectionImage = styled.div`
  cursor: pointer;
  background-image: ${props => `url(${props.srcImages})`};
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  border-radius: 20px;
  margin-bottom: 20px;
  width: calc(100% / 3 - 20px);
  aspect-ratio: ${props => props.version === 'posters' ? '0.667' : '1.778'};
  max-width: ${props => props.version === 'posters' ? '225px' : 'unset'};
  background-color: ${theme.colors.component.dark};
    img {
      border-radius: 20px;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
    

    @media ${theme.device.mobileM} {
      &:first-child {
        width: 100%;
      }

      &:nth-child(2) {
        height: 125px;
      }

      width: calc(50% - 20px);
    }
`;