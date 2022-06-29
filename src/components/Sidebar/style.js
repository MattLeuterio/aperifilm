import styled from 'styled-components';
import { sidebarWidthDSK, HeaderHeightDSK } from '../../../const';
import theme from '../../theme';

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: auto;
  width: ${sidebarWidthDSK};
  min-height: 100vh;
  padding: 0 15px;
`; 

export const MenuContainer = styled.div`
  margin-top: ${HeaderHeightDSK};
`;
export const MenuSection = styled.div`
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

     > div {
      background-color: ${theme.colors.component.light};
      border-radius: 6px;
      width: 28px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

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

       > div {
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