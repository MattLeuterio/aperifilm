import styled, { css } from 'styled-components';
import ActionsProductButton from '.';
import theme from '../../theme';

export const VotePanelContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: auto;
  right: auto;
  width: 100%;
  height: 100vh;
  background: rgba(17, 16, 23, 0.95);
  z-index: ${theme.zIndex.modal};

  .icon-close {
    position: absolute;
    cursor: pointer;
    top: 5%;
    right: 10%;
    z-index: ${theme.zIndex.absoluteUp};
  }
`;

export const MainContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .vote-title-product {
    margin-top: 10px;
    text-align: center;
  }
`;

export const VoteContainer = styled.div`
  position: relative;
  margin-top: 30px;
  margin-bottom: 112px;
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
    margin-right: 40px;

    @media ${theme.device.mobileL} {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  &.vote-btn {

    &.cancel {
      background-color: ${theme.colors.component.light};
      &:hover {
        background-color: ${theme.colors.component.dark}
      }
    }

    &.confirm {
      background-color: ${theme.colors.base.green};
      &:hover {
        filter: ${props => props.disable === undefined ? 'opacity(0.3)' : 'brightness(1.2)'};
      }
    }

    &.delete {
      background-color: ${theme.colors.component.light};
      min-width: 100px;
      height: 32px;

      &:hover {
        background-color: ${theme.colors.mainBrandColors.dark}
      }
    }
  }
`;

export const DeleteContainer = styled.div`
  position: absolute;
  bottom: -150%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const VoteBottlesContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const VoteBottleContainer = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
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