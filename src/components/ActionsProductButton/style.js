import styled, { css } from 'styled-components';
import ActionsProductButton from '.';
import Button from '.';
import theme from '../../theme';
export const ActionsProductButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${theme.colors.component.dark};
  
  ${props => {
    switch (props.size) {

      case ActionsProductButton.SIZE.MEDIUM:
      default:
        return css`
          border-radius: 9px;
          width: 40px;
          height: 35px;
        `;

      case ActionsProductButton.SIZE.SMALL:
        return css`
          border-radius: 6px;
          width: 27px;
          height: 25px;
        `;

      case ActionsProductButton.SIZE.PERSON:
        return css`
          border-radius: 50%;
          width: 25px;
          height: 25px;

          &.favorite-btn {
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
          }
        `;
    }
  }};

  .icon-action {
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
      ${props => {
        switch (props.size) {

          case ActionsProductButton.SIZE.MEDIUM:
          default:
            return css`
              width: 20px;
              height: 20px;
            `;

          case ActionsProductButton.SIZE.SMALL:
            return css`
              width: 15px;
              height: 15px;
            `;

          case ActionsProductButton.SIZE.PERSON:
            return css`
              width: 15px;
              height: 15px;
            `;
        }
      }};

      ${props => {
        switch (props.type) {
          case ActionsProductButton.TYPE.FAVORITE:
          default:
            return css`
              stroke: ${props => props.active ? theme.colors.mainBrandColors.light : theme.colors.element.light};
              fill: ${props => props.active ? theme.colors.mainBrandColors.light : 'transparent'};
            `;

          case ActionsProductButton.TYPE.WATCH:
            return css`
              stroke: ${props => props.active ? theme.colors.base.green : theme.colors.element.light};
            `;
        }
      }};
    }

  }

  .icon-image {
    ${props => {
      switch (props.size) {

        case ActionsProductButton.SIZE.MEDIUM:
        default:
          return css`
            width: 20px;
            height: 20px;
          `;

        case ActionsProductButton.SIZE.SMALL:
          return css`
            width: 6px !important;
            height: 13px !important;
          `;

        case ActionsProductButton.SIZE.PERSON:
          return css`
            width: 15px;
            height: 15px;
          `;
      }
    }};
  }

  .btn {

    &--favorite {

      svg {
        transition: all .2s ease-in-out;
      }

      &:hover {
        svg {
          stroke: ${theme.colors.mainBrandColors.light};
          transform: scale(1.2) rotate(-15deg);
        }
      }
    }

    &--watch {

      svg {
        transition: all .4s ease-in-out;
      }

      &:hover {
        svg {
          stroke: ${theme.colors.base.green};
          transform: scale(1.2) rotate(360deg);
        }
      }
    }

    &--vote {

      .icon-image {
        transition: all .4s ease-in-out;
      }

      &:hover {
        .icon-image {
          transform: scale(1.2) rotate(15deg);
        }
      }
    }
  }
`;

export const Label = styled.div`
  font-weight: ${props => props.active ? '600' : '400'};
`;