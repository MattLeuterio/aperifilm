import styled from 'styled-components';
import theme from '../../theme';

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;

  > div.icn-search {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
`;

export const SearchInput = styled.input`
  position: relative;
  padding: 10px 40px 10px 20px;
  width: 100%;
  height: 40px;
  color: ${theme.colors.element.light};
  background: ${theme.colors.component.light};
  border: none;
  border-radius: 8px;

  /* @media ${theme.device.tabletL} {
    font-size: 56px;
  } */

  &:focus {
    outline: 0;
  }

`;

export const SuggestionProduct = styled.div`
  width: 100%;
  //background: ${theme.colors.primary.dark};
  position: absolute;
  top: calc(100% + 20px);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: ${theme.colors.component.light};
  box-shadow: ${theme.utils.elementShadow};
  max-height: ${props => props.isVisible ? '225px' : '0'};
  transition: all .5s ease-in-out;

  > a:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Product = styled.div`
  padding: 10px;
  min-height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;

  &:hover {
    background: ${theme.colors.element.hover};
  }

  /* @media ${theme.device.mobileL} {
    padding: 10px 20px;
  } */
`;

export const ImageBox = styled.div`
  width: 40px;
  min-width: 40px;
  height: 30px;
  border-radius: 3px;
  background-image: ${props => `url(${props.bgResult})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${theme.colors.component.dark};

  &.has-placeholder {
    background-size: 20px;
  }
`;

export const ProductType = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  color: ${theme.colors.element.dark};
  width: 20%;
  padding-left: 20px;
  font-weight: 600;
  margin-right: 10px;
  letter-spacing: ${theme.utils.letterSpacing};
`;

export const Title = styled.div`
    font-weight: 500;
    width: 55%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
`;


export const VoteBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const GoToWrapper = styled.div`
  display: flex;
  justify-content: center;
`;



