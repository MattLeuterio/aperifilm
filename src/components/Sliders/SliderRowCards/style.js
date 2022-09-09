import styled, { css } from 'styled-components';
import theme from '../../../theme';

export const SliderRowCardsContainer = styled.div`
  margin: 0 -20px;

  .swiper {
    width: 100%;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
  }

  .swiper-slide {

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;

    width: fit-content;
    max-width: 100%;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: calc(30px/ 44 * 27);
    height: 30px;
    margin-top: calc(0px - (30px/ 2));
    color: ${theme.colors.element.light}
  }

  .swiper-button-next {
    right: 20px;
  }

  .swiper-button-prev {
    left: 20px;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 30px;
  }

  .swiper-pagination-fraction {
    bottom: 20px;
    font-size: 12px;
  }

  .swiper-pagination-current {
    font-weight: 600;
    font-size: 18px;
    margin-right: 2px;
  }
  .swiper-pagination-total {
    font-size: 14px;
    margin-left: 2px;
  }

  @media (max-width: 860px) {
    .swiper-button-prev,
    .swiper-button-next {
      width: calc(18px/ 44 * 27);
      height: 18px;
      margin-top: calc(0px - (18px/ 2));
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-size: 18px;
    }

    .swiper-button-next {
      right: 10px;
    }

    .swiper-button-prev {
      left: 10px;
    }
  }

`;

export const Slide = styled.div`
  background-image: ${props => `url(${props.urlImage})`};
  width: 100%;
  height: 100%;
  max-width: 80%;
  max-height: 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

