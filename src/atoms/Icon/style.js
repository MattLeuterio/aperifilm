import styled, { css } from 'styled-components';

export const IconContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};

  > svg {
    fill: ${props => props.fill};
    stroke: ${props => props.stroke};
    stroke-width: ${props => props.strokeWidth};
    width: ${props => props.size};
    height: ${props => props.size};
  }

  ${props => props.disable && css`
    cursor: not-allowed;
    pointer-events: none;

    > svg {
      filter: brightness(0.5);
    }
  `}


`;


