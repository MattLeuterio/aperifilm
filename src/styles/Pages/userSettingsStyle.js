import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex } from '../../js/Mixins';
import theme from '../../theme';

export const UserSettingsContainer = styled.div`
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 40px;

  .box-form {
    margin-top: 50px;
  }

  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

export const ActionsWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-start;

  .settings-btn {
    &--restore {
      margin-right: 16px;
      background-color: ${(props) => props.theme.colors.element.select};

      &:hover {
        filter: contrast(1.05);
      }
    }
  }
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
  
  // Form
  .MuiFormControl-root {
    max-width: 300px;

    &:not(:last-child) {
      margin-bottom: 32px;
    }

    // label
    label.MuiFormLabel-root {
      color: ${theme.colors.element.dark};
    }

    
    .MuiInputBase-root {

      input {
        &:invalid {
          color: ${theme.colors.mainBrandColors.light};
        }
        
        &[aria-invalid = "true"] {
          color: ${theme.colors.mainBrandColors.light};
        }
      }
      
      // Hover Input
      &:hover:not(.Mui-disabled):before {
        border-bottom: 2px solid ${theme.colors.element.light};
      }

      // Border static Input
      &:before {
        border-bottom: 2px solid ${theme.colors.element.dark};
      }

      // Border Focus Input
      &:after {
        border-bottom: 2px solid ${theme.colors.base.green};
      }

      // Input 
      .MuiInputBase-input {
        color: ${theme.colors.primary.white};
      }
    }
  }
`;

export const Form = styled.form`
`;
export const Input = styled.input`
  background-color: transparent;
  outline: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.base.darkGray};
  padding: 10px 0px;
  color: ${theme.colors.primary.white};
  transition: all .3s ease-in-out;

  &[type="submit"] {
    width: 120px;
    height: 42px;
    border: none;
    background-color: ${theme.colors.mainBrandColors.light};
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.mainBrandColors.dark};
    
    }
  }

  &:focus-visible {
    border-bottom: 1px solid ${theme.colors.primary.white};
  }
`;

export const ErrorWrapper = styled.div`
  margin-top: 10px;
`;
export const Error = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.mainBrandColors.light};
`;