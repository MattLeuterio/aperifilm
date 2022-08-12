import styled from 'styled-components';

export const BadgeContainer = styled.div`
  position: absolute;
  padding: 5px 16px;
  border-radius: 10px;
  width: fit-content;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.colorText};
  top: ${props => props.top};
  left: ${props => props.left};
  bottom: ${props => props.bottom};
  right: ${props => props.right};
`;