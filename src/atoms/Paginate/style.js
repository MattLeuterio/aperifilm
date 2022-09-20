import styled from 'styled-components';
import theme from '../../theme';

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  nav {
    
    ul {

      li {

        .MuiPaginationItem-ellipsis {
          color: ${theme.colors.element.light};
        }

        button {
          color: ${theme.colors.element.light};
          font-weight: 300;

          &.Mui-selected {
            background-color: transparent;
            color: ${theme.colors.mainBrandColors.light};
            font-weight: 700;
          }
        }
      }
    }
  }
`;