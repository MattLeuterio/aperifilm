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

export const ModalContainer = styled.div`
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

  .modal-title {
    margin-bottom: 12px;
  }

  .modal-subtitle {
    max-width: 400px;
  }
`;

export const Body = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Left = styled.div``;
export const Right = styled.div``;
export const PreviewContainer = styled.div``;
export const Preview = styled.div`
  width: 225px;
  height: 400px;
  background-color: ${props => props.settings.colors.background};
  border: 1px solid ${props => theme.colors.primary.white};

  .svg-preview {
    position: absolute;

    &.layout-1 {
      bottom: 32px;
      left: 1px;
    }
  }
`;
export const ButtonsContainer = styled.div``;
export const LayoutContainer = styled.div``;
export const SettingsContainer = styled.div``;
export const SettingLeft = styled.div``;
export const SettingRight = styled.div``;
export const Setting = styled.div``;