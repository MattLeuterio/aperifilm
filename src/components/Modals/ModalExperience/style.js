import styled, { css } from 'styled-components';
import ActionsProductButton from '.';
import theme from '../../../theme';
import { ModalsHeightDSK, ModalsWidthDSK } from '../../../../const';

export const BackgroundOpacity = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(17, 16, 23, 0.95);
  z-index: ${theme.zIndex.backgroundModal};
`;

export const VotePanelContainer = styled.div`
  position: fixed;
  padding: 50px 0 50px;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  bottom: auto;
  right: auto;
  width: ${ModalsWidthDSK};
  height: fit-content;
  background-color: ${theme.colors.component.dark};
  z-index: ${theme.zIndex.modal};
  border-radius: 13px;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;

  .icon-close {
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 20px;
    z-index: ${theme.zIndex.absoluteUp};
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  .modal-title {
    margin-bottom: 12px;
  }

  .modal-subtitle {
    
  }
`;

export const Body = styled.div`
  width: 100%;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderQuestion = styled.div`
  margin-bottom: 20px;
`;
export const Question = styled.div`
`;

export const Explanation = styled.div`
  margin-top: 5px;
`;

export const Footer = styled.div`

  @media ${props => props.theme.device.tablet} {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

export const Button = styled.div`
  width: fit-content;
  min-width: 120px;
  height: 42px;
  padding: 0 20px;
  cursor: ${props => props.disable === undefined ? 'not-allowed' : 'pointer'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  filter: ${props => props.disable === undefined ? 'opacity(0.3)' : 'unset'};
  pointer-events: ${props => props.disable === undefined ? 'none' : 'all'};

  transition: all .3s ease-in-out;

  &:not(:last-child) {
    margin-right: 16px;

    @media ${theme.device.tablet} {
      margin-right: 0;
    }
  }
  @media ${theme.device.tablet} {
    margin-right: 0;
    border-radius: 0;
  }

  &.vote-btn {
    &.cancel {
      background-color: ${theme.colors.component.light};
      &:hover {
        filter: ${props => props.disable === undefined ? 'opacity(0.3)' : 'brightness(1.2)'};
      }
      @media ${theme.device.tablet} {
        min-width: 36%;
        flex-grow: 1;
      }
    }

    &.skip {
      background-color: ${theme.colors.element.hover};
      &:hover {
        filter: ${props => props.disable === undefined ? 'opacity(0.3)' : 'brightness(1.2)'};
      }

      @media ${theme.device.tablet} {
        min-width: 28%;
      }
    }

    &.confirm {
      background-color: ${theme.colors.mainBrandColors.dark};
      &:hover {
        filter: ${props => props.disable === undefined ? 'opacity(0.3)' : 'brightness(1.2)'};
      }

      @media ${theme.device.tablet} {
        min-width: 36%;
        flex-grow: 1;
      }
    }
  }
`;

export const DeleteContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const VoteBottlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 300px;
  border-radius: 80px;
  background: rgba(255, 255, 255, 0.02);
`;

export const VoteBottleContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

export const VoteBottle = styled.div`
  display: inline-block;
  background-image: ${props => `url(${props.urlSrc})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 20px;
  height: 42px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &.vote-bottle {

    &.empty {
      
    }
    &.half {
      display: ${props => props.voteRange ? 'block' : 'none'};
    }
    &.full {
      display: ${props => props.voteRange ? 'block' : 'none'};
    }
  }
`;

export const HoverContainer = styled.div`

  &.hover-container {
    cursor: pointer;
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
    
    &.half {
      top: 0;
    }

    &.full {
      bottom: 0;
    }
  }
`;

export const DatePickerWrapper = styled.div`
  .modal-experience-date-picker {
    font-size: 14px;
    text-align: center;
    border-radius: 7px;
    border: 1px solid ${theme.colors.primary.white};
    background: transparent;
    color: ${theme.colors.primary.white};
    height: 37px;
    width: 130px;

  }

  .react-datepicker-popper {
    font-family: inherit;
    
    .react-datepicker {
      font-family: inherit;
      border: 0;
      background-color: ${theme.colors.component.light};

      &__triangle {
        background: red;
        border: 0;
        border-color: transparent;
        border-bottom-color: transparent;

        &::before {
          top: 0;
          border-bottom-color: blue;
        }

        &::after {
          border-bottom-color: ${theme.colors.element.dark};
        }
      }

      &__month-container {
        width: 200px;

        /* HEADER */
        .react-datepicker__header {
          background-color: #232132;
          padding: 9px 0;

          .react-datepicker__current-month {
            color: ${theme.colors.primary.white};
            text-transform: capitalize;
          }

          .react-datepicker__day-names {
            margin-top: 8px;

            .react-datepicker__day-name {
              color: ${theme.colors.primary.white};
              margin: 3px;
              line-height: 2em;
              width: 20px;
            }
          }
        }

        /* MONTH */
        .react-datepicker__month {

          .react-datepicker__week {

            .react-datepicker__day {
              margin: 3px;
              color: ${theme.colors.primary.white};

              &--disabled {
                color: ${theme.colors.element.hover};
              }

              &--selected {
                background: ${theme.colors.mainBrandColors.dark};
              }

              &--keyboard-selected {
                background-color: ${theme.colors.element.hover};
              }

              &:hover {
                background-color: ${theme.colors.element.hover};
              }
            }
          }
        }
      }
      /* Navigation */
  
      &__navigation {
        height: 26px;
        width: 26px;
      }
    }
  }
`;

export const ErrorWrapper = styled.div`
  margin-top: 10px;
  height: 12px;
`;

export const PlaceEmojiIconContainer = styled.div`
  display: flex;

  @media ${theme.device.tablet} {
    
  }
`;

export const PlaceEmojiIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-right: 30px;
  }

  ${props => props.selected && css`
    
    ${Emoji} {
      background-color: ${theme.colors.mainBrandColors.transparent};
    }
  `}
`;

export const Emoji = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  border: 1px solid ${theme.colors.primary.white};
  user-select: none;
  cursor: pointer;
  margin-bottom: 8px;
`;

export const PlaymateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .select {
    &-emoji {
      width: 52px;
      .select__control {
        font-size: 16px;
        height: 35px;
        .select__value-container {
          padding: 0px 0px 3px;
          text-align: center;
        }
      }

    .select__menu {
      background-color: ${theme.colors.component.light};
      box-shadow: ${theme.utils.elementShadow};
      top: 35px;

    &-list {

      .select__option {
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        background-color: transparent;

        &:hover {
          background-color: ${theme.colors.element.hover};
        }

        &--is-selected {
          background-color: ${theme.colors.element.select};
        }
      }
    }
  }
    }
  }
`;  

export const AddWrapper = styled.div`
  display: flex;
  align-items: center;

  .icon-add {
    margin-left: 8px;
    cursor: pointer;
  }
`;

export const SelectContainer = styled.div``;

export const Input = styled.input`
  height: 35px;
  border-radius: 4px;
  outline: none;
  border: 1px solid white;
  background: transparent;
  color: white;
  padding: 0 5px;
  margin-left: 8px;
`;

export const ListPlaymateWrapper = styled.div`
  margin-top: 20px;
  overflow: auto;
  max-height: 149px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlaymateElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  .icon-remove {
    margin-left: 8px;
    cursor: pointer;
  }
`;

export const EmojiPlaymate = styled.div`
  font-size: 16px;
  width: 52px;
  margin-right: 8px;
  text-align: left;
  padding-left: 7px;
`;
export const Mate = styled.div`
  width: 157px;
  padding-left: 5px;
`;

export const EmojiIconContainer =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media ${theme.device.tablet} {
    width: 320px;
    max-height: 260px;
    overflow: auto;
  }
`;

export const EmojiIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 12px;
  transition: scale 0.2s ease-in-out;

  &:hover {
    scale: 1.2;
  }

  &:not(:last-child) {
    //margin-right: 30px;
  }

  ${props => props.selected && css`
    
    ${Emoji} {
      background-color: ${theme.colors.mainBrandColors.transparent};
    }
  `}
`;

export const EndTitle = styled.div`
  margin-bottom: 20px;
`;

export const CurrentDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .icon-date {
    margin-left: 5px;
    cursor: pointer;

    &:hover {
      > svg {
        stroke: ${theme.colors.mainBrandColors.light};
      }
    }
  }
`;