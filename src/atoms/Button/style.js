import styled, { css } from 'styled-components';
import Button from '.';
import theme from '../../theme';
export const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => props.active 
    ? theme.colors.mainBrandColors.light
    : theme.colors.component.light
  };
  color: ${props => props.active 
    ? theme.colors.element.light
    : theme.colors.element.dark
  };
  transition: all .3s ease-in-out;

  &:hover {
    background-color: ${props => props.active 
    ? theme.colors.mainBrandColors.dark
    : theme.colors.component.light
  };
  }

  ${props => props.hide && css`
    display: none;
  `}
  
  ${props => {
    switch (props.size) {
      case Button.SIZE.LARGE:
        return css`
           width: 140px;
           height: 42px;
        `;

      case Button.SIZE.MEDIUM:
      default:
        return css`
           width: 120px;
           height: 42px;
        `;

      case Button.SIZE.SMALL:
        return css`
           width: 100px;
           height: 42px;
        `;
    }
  }};

  a {
    color: ${props => props.active 
    ? theme.colors.element.light
    : theme.colors.element.dark
    };
    font-weight: 600;
  }

  .icon {
    margin-right: 6px;
  }
`;

export const Label = styled.div`
  font-weight: ${props => props.active ? '600' : '400'};
`;

export const NumberWrapper = styled.div`
  border-radius: 50%;
  width: 18px;
  min-width: 18px;
  height: 18px;
  min-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.active 
    ? theme.colors.element.light
    : theme.colors.element.dark
  };
  color: ${props => props.active 
    ? theme.colors.mainBrandColors.light
    : theme.colors.component.light
  };
  margin-left: 6px;
`;

export const Number = styled.div`
  font-size: 10px;
  font-weight: 600;
`;