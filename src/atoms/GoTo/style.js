import styled from 'styled-components';

export const GoToContainer = styled.div`
  a {
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    display: flex;
    align-items: center;

    > * {
      margin-left: 3px;
    }
  }
`;