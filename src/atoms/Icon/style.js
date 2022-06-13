import styled from 'styled-components';

export const IconContainer = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};

  > svg {
    fill: ${props => props.fill};
    stroke: ${props => props.stroke};
    stroke-width: ${props => props.strokeWidth};
    width: ${props => props.size};
    height: ${props => props.size};
  }
`;


