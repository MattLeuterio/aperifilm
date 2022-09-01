import styled, { css } from 'styled-components';
import ActionsProductButton from '.';
import Button from '.';
import theme from '../../theme';

export const FullScreenPanelContainer = styled.div`
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

export const Welcome = styled.div`
  position: relative;
  max-width: 834px;
  background-color: ${theme.colors.component.dark};
  border-radius: 20px;
  padding: 20px 40px 30px;
  margin: 30px auto;

  .welcome-close-icon {
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 18px;

    &:hover {
      svg {
        stroke: ${theme.colors.element.light};
      }
    }
  }
`;

export const WelcomeTitle = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 8px;

  .apericheers-red-icon {
    margin-right: 12px;
    height: 43px;
  }
`;

export const WelcomeDescription = styled.div`
`;