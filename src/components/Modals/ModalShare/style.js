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
    position: relative;
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

export const Line = styled.div`
  display: flex;
  button {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    cursor: pointer !important;
    padding: 4px 6px !important;
    border-radius: 8px !important;
    color: ${theme.colors.element.light} !important;
    background-color: ${theme.colors.component.light} !important;

    svg {
      margin-right: 8px;
    }

    &:hover {
    background-color: ${theme.colors.element.select} !important;
  }
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  button:not(:last-child) {
    margin-right: 10px;
  }
`;

export const ButtonShareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  color: ${theme.colors.element.light};
  background-color: ${theme.colors.component.light};
  margin-right: 10px;

  &:not(:last-child) {
  }

  &:hover {
    background-color: ${theme.colors.element.select};
  }

  .icon-copy {
    padding: 5px;
    background-color: ${theme.colors.component.dark};
    border-radius: 50%;
    margin-right: 10px;
  }

  .icon-instagram {
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
    box-shadow: 0px 3px 10px rgba(0,0,0,.25);
    border-radius: 50%;
    padding: 5px 5px 5px 4px;
    margin-right: 8px;

    img {
    }
  }

`;