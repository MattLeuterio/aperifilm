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

  .modal-title {
    margin-bottom: 12px;
  }

  .modal-subtitle {
    
  }
`;

export const Body = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Footer = styled.div`
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${theme.device.mobileL} {
    flex-direction: column;
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

    @media ${theme.device.mobileL} {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  &.vote-btn {
    &.cancel {
      background-color: ${theme.colors.component.light};
      &:hover {
        filter: ${props => props.disable === undefined ? 'opacity(0.3)' : 'brightness(1.2)'};
      }
    }

    &.confirm {
      background-color: ${theme.colors.mainBrandColors.dark};
      &:hover {
        filter: ${props => props.disable === undefined ? 'opacity(0.3)' : 'brightness(1.2)'};
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