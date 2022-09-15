import styled, { css } from 'styled-components';
import Card from '.';
import { BackButton } from '../../atoms';
import { LineClamp } from '../../js/Mixins';
import theme from '../../theme';

export const CardContainer = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
  border-radius: 16px;
  width: ${props => props.widthCard};
  width: ${props => props.heightCard};
  background: ${theme.colors.component.dark};
  overflow: hidden;
  color: ${props => props.active 
    ? theme.colors.element.light
    : theme.colors.element.dark
  };
  
  ${props => {
    switch (props.type) {
      case Card.TYPE.DEFAULT:
      default:
        return css`
           width: 240px;
           height: 290px;

          .action-buttons {
            position: absolute;
            top: 15px;
            right: 15px;
          }
        `;

      case Card.TYPE.COLLECTION:
        return css`
          background: transparent;
          width: 160px;
          height: fit-content;
          border-radius: 0;
        `;

      case Card.TYPE.DISCOVER:
        return css`
          background: ${props => `linear-gradient(90deg, #101116 0%, rgba(0, 0, 0, 0) 100%),url(${props.mainImg})`};
          width: 510px;
          height: 365px;
          padding: 35px 25px;
          border-radius: 20px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        `;

      case Card.TYPE.PERSON:
        return css`
          padding: 15px;
          border-radius: 5px;
          width: 200px;
          height: 270px;
        `;

      case Card.TYPE.TRENDING:
        return css`
          padding: 20px;
          border-radius: 20px;
          width: 100%;
          height: 180px;
          display: flex;
        `;
    }
  }};

  a {
    color: ${props => props.active 
    ? theme.colors.element.light
    : theme.colors.element.dark
    };
    font-weight: 600;
  }

  .icon {
    margin-right: 6px;
  }
`;

export const Top = styled.div`
  position: relative;
  ${props => {
    switch (props.type) {
      case Card.TYPE.DEFAULT:
      default:
        return css`
          .main-image {
            img {
              height: 100%;
              object-fit: cover;
            }

            &.no-image {
              img {
                height: 100%;
                object-fit: contain;
                object-position: 50% 10px;
              }
            }
          }

          .rating-container {
            position: absolute;
            bottom: -13px;
            right: 15px;
          }
        `;

      case Card.TYPE.COLLECTION:
        return css`
          height: 240px;
          border-radius: 5px;
          .main-image {
            img {
              border-radius: 5px;
              height: 240px;
              object-fit: cover;
            }

            &.no-image {
              img {
                height: 240px;
                object-fit: contain;
                object-position: 50%;
                background: ${theme.colors.component.light};
              }
            }
          }

          .rating-container {
            position: absolute;
            bottom: -13px;
            right: 15px;
          }
        `;

      case Card.TYPE.DISCOVER:
        return css`
          .card-title {
            ${LineClamp({numLines: 2})}
            max-width: 85%;

            @media ${theme.device.mobileL} {
              max-width: 100%;
            }
          }

          .card-genre {
            margin-top: 2px;
            max-width: 85%;
          }
          .card-description {
            margin-top: 5px;
            margin-bottom: 10px;
            ${LineClamp({numLines: 3})}
            max-width: 85%;

            @media ${theme.device.mobileL} {
              max-width: 100%;
            }
          }
        `;

      case Card.TYPE.PERSON:
        return css`
          .main-image {
            margin: 0 auto;
            max-width: 150px;
            width: unset;
            height: unset;
            aspect-ratio: 1/1;
            img {
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }
          }
        `;

      case Card.TYPE.TRENDING:
        return css`
          .action-buttons {
            position: absolute;
            top: 0;
            right: 0;
          }
        `;
    }
  }};
`;

export const Bottom = styled.div`
  position: relative;
  ${props => {
    switch (props.type) {
      case Card.TYPE.DEFAULT:
      default:
        return css`
          padding: 15px;

          .card-genre {
            margin-bottom: 10px;
            ${LineClamp({numLines: 1})}
          }

          .card-title {
            ${LineClamp({numLines: 3})}
            max-height: 60px;
            min-height: 60px;
            margin-bottom: 10px;
          }

          .main-image {
            img {
              height: 100%;
              object-fit: cover;
            }
          }
        `;

      case Card.TYPE.COLLECTION:
        return css`
          padding: 15px;

          .card-genre {
            margin-bottom: 10px;
            ${LineClamp({numLines: 1})}
          }

          .card-title {
            ${LineClamp({numLines: 3})}
            max-height: 60px;
            min-height: 60px;
            margin-bottom: 10px;
          }

          .main-image {
            img {
              height: 100%;
              object-fit: cover;
            }
          }
        `;

      case Card.TYPE.DISCOVER:
        return css`
          position: absolute;
          width: 100%;
          padding: 0 25px;
          bottom: 35px;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `;

      case Card.TYPE.PERSON:
        return css`
          padding: 15px 0px;

          .card-title {
            margin-bottom: 5px;
            ${LineClamp({numLines: 2})}
          }

          .card-description {
            margin-bottom: 5px;
            ${LineClamp({numLines: 2})}
          }
        `;

      case Card.TYPE.TRENDING:
        return css`
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        `;
    }
  }};
`;

export const Left = styled.div`
    ${props => {
    switch (props.type) {
      case Card.TYPE.TRENDING:
      default:
        return css`
           .main-image {
             img {
                border-radius: 20px;
                height: 100%;
                object-fit: cover;
              }
           }
        `;
    }
  }};
`;

export const Right = styled.div`
    ${props => {
    switch (props.type) {
      case Card.TYPE.TRENDING:
      default:
        return css`
          margin-left: 35px;
          width: 100%;
          display: flex;
          flex-direction: column;

          .card-genre {
            margin-bottom: 5px;
          }

          .card-title {
            ${LineClamp({numLines: 2})}
            max-height: 68px;
            margin-bottom: 20px;
            max-width: 80%;
          }

          .card-position {

          }
        `;
    }
  }};
`;

export const StatisticsContainer = styled.div`

${props => {
    switch (props.type) {
      case Card.TYPE.DEFAULT:
      default:
        return css`
        `;

      case Card.TYPE.DISCOVER:
        return css`
          margin-top: 10px;
        `;

      case Card.TYPE.PERSON:
        return css`
        `;

      case Card.TYPE.TRENDING:
        return css`
        `;
    }
  }};
`;