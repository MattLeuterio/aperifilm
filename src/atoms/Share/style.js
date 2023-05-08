import styled, { css } from 'styled-components';
import Button from '.';
import theme from '../../theme';
export const ShareContainer = styled.div`
  position: relative;
  cursor: pointer;
  .icon-share {

    svg {
        transition: all .2s ease-in-out;
      }

      &:hover {
        svg {
          stroke: ${theme.colors.mainBrandColors.light};
          fill: ${theme.colors.base.blue};
          transform: scale(1.1) rotate(-8deg);
        }
      }
  }
`;

export const ButtonsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: auto;
  right: auto;
  width: 100%;
  height: 100vh;
  background: rgba(17, 16, 23, 0.95);
  z-index: ${theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon-close {
    position: absolute;
    cursor: pointer;
    top: 5%;
    right: 10%;
    z-index: ${theme.zIndex.absoluteUp};
  }

  .title {
    margin-bottom: 20px;
  }

  button {

    svg {
      transition: all 0.8s;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

export const Line = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const CopyUrl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .icon-copy {
    padding: 5px;
    background-color: ${theme.colors.component.light};
    border-radius: 50%;
    margin-right: 10px;
  }

`;