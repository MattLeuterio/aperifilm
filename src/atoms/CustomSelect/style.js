import styled, { css } from 'styled-components';
import Button from '.';
import theme from '../../theme';
export const CustomSelectContainer = styled.div`
  width: ${props => props.width};

  .select__control {
    font-size: 12px;
    background: transparent;
    border-color: ${theme.colors.element.dark};
    min-height: 30px;
    height: 30px;
    box-shadow: none;

    &:hover {
      border-color: ${theme.colors.element.dark} !important;
    }

    &.select__control--menu-is-open {
      border-color: inherit;
      box-shadow: inherit;
    }

    .select__value-container {

      .select__input-container {
        color: ${theme.colors.element.light};
      }

      .select__single-value {
        color: ${theme.colors.element.light};
        font-weight: 500;
      }
    }

    .select__indicators {
      cursor: pointer;
      .select__indicator-separator {
        display: none;
      }
      .select__indicator {
        color: ${theme.colors.element.dark};
        padding: 0;

        &:hover {
          color: ${theme.colors.element.light}
        }
      }

    }
  }

  .select__menu {
    background-color: ${theme.colors.component.light};
    box-shadow: ${theme.utils.elementShadow};
    top: 35px;

    &-list {

      .select__option {
        cursor: pointer;
        font-size: 12px;
        background-color: transparent;

        &:hover {
          background-color: #252434;
        }

        &--is-selected {
          background-color: #252434;
        }
      }
    }
  }
`;