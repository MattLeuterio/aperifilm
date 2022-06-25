import styled, { css } from 'styled-components';
import { HeaderHeightDSK, HeaderHeightMOB, HeaderWidthDSK } from '../../../const';
import theme from '../../theme';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: ${HeaderWidthDSK};
  height: ${HeaderHeightDSK};
  z-index: ${theme.zIndex.header};

  .logo-website {
    cursor: pointer;
    position: absolute;
    top: calc(${HeaderHeightDSK} / 2);
    transform: translateY(-50%);
    left: -185px;

    @media ${props => props.theme.device.tabletL} {
      left: 50%;
      top: calc(${HeaderHeightMOB} / 2);
      transform: translate(-50%, -50%);
    }

    @media ${props => props.theme.device.mobileM} {
      width: 120px;
    }
  }

  @media ${props => props.theme.device.tabletL} {
    height: ${HeaderHeightMOB};
    padding: 0 20px;
    background: rgba(38, 40, 55, 0.96);
  }
`;

export const SearchWrapper = styled.div`
  width: 60%;
  transition: transform .5s ease-in-out;
  
  @media ${props => props.theme.device.tabletL} {
    width: 100%;
    position: absolute;
    top: calc(${HeaderHeightMOB} + 20px);
    left: 0;
    padding: 0 10px;
    ${props => !props?.isVisible && css`
      transform: translateY(calc(-100% - ${HeaderHeightMOB} - 20px));
    `};
  }
`;

export const ActionWrapper = styled.div`
  user-select: none;
  display: flex;
  align-items: center;

  @media ${props => props.theme.device.tabletL} {
    .login-button {
      width: 30px;
      height: 32px;
      background-color: transparent;
      .icon {
        margin-right: 0;
      }
      > a {
        display: none;
      }
    }
  }

`;

export const MobileActionsWrapper = styled.div`
  display: flex;
  align-items: center;

  > div:first-child {
    margin-right: 5px;
  }
`;

export const UserWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media ${props => props.theme.device.tabletL} {
    .icn-arrow-user {
      display: none;
    }
  }
  svg {
    cursor: pointer;
  }
`;


export const UserImageWrapper = styled.div`
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${theme.colors.component.light};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media ${props => props.theme.device.tabletL} {
    .user-image {
      width: 30px;
      height: 30px;
    }
  }
  `;

export const UserName = styled.div`
  cursor: pointer;
  margin: 0 5px 0 10px;
  
  @media ${props => props.theme.device.tabletL} {
    display: none;
  }
  `;

export const UserDropdown = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  min-width: 130px;
  padding: 10px 7px;
  border-radius: 5px;
  background-color: ${theme.colors.component.light};
  
  @media ${props => props.theme.device.mobileL} {
    position: fixed;
    top: 60px;
    right: 0;
    min-width: 100%;
    padding: 10px 7px;
    border-radius: 0px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-end;
    background: rgba(38,40,55,0.96);
    overflow: hidden;
    height: ${props => props.isVisible ? 'fit-content' : '0'};
    transition: all .5s ease-in-out;
  }
`;

export const SettingButton = styled.div`
  cursor: pointer;
  display: flex;
  font-size: 12px;

  &:not(:last-child) {
    margin-bottom: 5px;

    @media ${props => props.theme.device.mobileL} {
      margin-bottom: 0px;
      margin-right: 15px;
    }
  }

  > div:first-child {
    margin-right: 6px;
  }
`;

export const LanguageWrapper = styled.div`
  position: relative;
  margin-left: 40px;

  @media ${props => props.theme.device.tabletL} {
    margin-left: 10px;
  }
`;

export const ImageWrap = styled.div`
  cursor: pointer;
  border-radius: 2px;
  overflow: hidden;
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 190px;
  padding: 10px 7px;
  border-radius: 5px;
  background-color: ${theme.colors.component.light};

  @media ${props => props.theme.device.mobileL} {
    position: fixed;
    top: 60px;
    left: 0;
    min-width: 100%;
    padding: 20px 20px;
    border-radius: 0px;
    background-color: #302E42;
    background: rgba(38,40,55,0.96);
  }
`;

export const LDropSection = styled.div`

&:not(:last-child) {
  margin-bottom: 20px;
}

`;
export const LDropTitle = styled.div`
  display: flex;
  align-items: center;

  > div:first-child {
    margin-right: 4px;
  }
`;

export const SelectCtn = styled.div`
  margin-top: 10px;
`;

export const MenuWrapper = styled.div`
  background: rgba(38, 40, 55, 0.96);
  position: fixed;
  top: ${HeaderHeightMOB};
  left: 0;
  width: 100%;
  overflow: hidden;
  height: ${props => props.isVisible ? '100vh' : '0'};
  filter: ${props => props.isVisible ? 'unset' : 'blur(6px)'};
  transition: all .5s ease-in-out;
  `;

export const MenuSection = styled.div`
  padding: 15px;
`;

export const MenuSectionLinks = styled.div`
  position: relative;
  margin-top: 20px;
  padding-bottom: 60px;

  &:not(:last-child):after {
    content: '';
    background-color: ${theme.colors.component.light};
    width: 100%;
    height: 1px;
    position: absolute;
    top: calc(100% - 30px);
    left: 0;
  }

  .link {
    cursor: pointer;
    color: ${theme.colors.element.dark};
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    > div.icn-arrow {
      margin-left: auto;
    }

     > div.icn-page {
      background-color: ${theme.colors.component.light};
      border-radius: 6px;
      width: 28px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;

      > div.icon-image--active {
        display: none;
      }

      > svg {
        fill: ${theme.colors.element.dark};
        width: 20px;
        height: 20px;
      }
    }

    &.active {
      color: ${theme.colors.element.light};

      > div {
        > div {
          
          &.icon-image--active {
            display: block;
          } 
          &.icon-image--disable {
            display: none;
          } 

        }
        
      }


      a {
        font-weight: 600;
      }

       > div.icn-page {
        background-color: ${theme.colors.mainBrandColors.dark};

        > svg {
          fill: ${theme.colors.element.light};
          width: 20px;
          height: 20px;
        }
      }
    }
  }

`;
