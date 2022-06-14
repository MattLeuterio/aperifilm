import styled from 'styled-components';

export const GoToContainer = styled.div`
  a {
    color: ${props => props.color};
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;

    > * {
      margin-left: 3px;
    }
  }
`;