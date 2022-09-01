import styled, { css } from 'styled-components';
import theme from '../../../theme';

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
`;

export const SliderFullScreenContainer = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-wrapper {
    width: 100%;
    height: 100vh;
  }

  .swiper-slide {
    max-width: 100%;
    text-align: center;
    font-size: 18px;

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
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    max-width: 70%;
    height: 100%;
    max-height: 70%;
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

  @media ${theme.device.mobileL} {
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

