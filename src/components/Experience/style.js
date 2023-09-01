import styled, { css } from 'styled-components';
import theme from '../../theme';
import { LineClamp } from '../../js/Mixins';

export const ExperienceQuestion = styled.div`
  background: ${theme.colors.component.dark};
  display: flex;
  align-items: center;
  border-radius: 5px;
  min-height: 90px;
  padding: 0 20px;
`;

export const ExperienceBox = styled.div`
  width: 100%;
  background: ${theme.colors.component.dark};
  border-radius: 5px;
  min-height: 90px;
  padding: 30px 20px 40px;

  ${props => Boolean(props.background) && css`
    background-image: ${props => `linear-gradient(90deg,#23252e 0%,rgb(0 0 0 / 77%) 187.92%),url(${props.background})`};
    background-position: top center;
    background-size: cover;
  `};
`;

export const LeftContainer = styled.div`
  flex-grow: 1;
`;
export const RightContainer = styled.div`
  display: flex;

  .btn {
    &-left {
      margin-right: 32px;
    }
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  @media ${theme.device.mobileM} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ExperienceHeaderTitle = styled.div`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 600;
  max-width: 80%;
  ${LineClamp({numLines: 2})}

  @media ${theme.device.mobileM} {
    max-width: 100%;
  }
`;

export const ExperienceHeaderButton = styled.div`
  display: flex;

  > div:not(:last-child) {
    margin-right: 8px;
  }

  @media ${theme.device.mobileM} {
    margin-right: auto;
    margin-top: 40px;
  }

  .icon-experience {
    svg {
      transition: all .2s ease-in-out;
    }

    &.edit {
      &:hover {
        svg {
          stroke: ${theme.colors.base.blue};
          transform: scale(1.2) rotate(15deg);
        }
      }
    }
    &.delete {
      &:hover {
        svg {
          stroke: ${theme.colors.mainBrandColors.light};
          transform: scale(1.2) rotate(-15deg);
        }
      }
    }
    &.go {
      &:hover {
        svg {
          stroke: ${theme.colors.base.green};
          transform: scale(1.2) translateX(3px);
        }
      }
    }
  }
`;

export const ExperienceBody = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${theme.device.tablet} {
    flex-direction: column;
  }
`
;
export const ExperienceBodyLeft = styled.div`
  width: 35%;

  @media ${theme.device.tablet} {
    width: 100%;
    display: flex;
    margin-bottom: 30px;
  }

  @media ${theme.device.mobileL} {
    flex-direction: column;
    margin-bottom: 0;
  }
`;
export const ExperienceBodyCenter = styled.div`
  width: 35%;

  @media ${theme.device.tablet} {
    width: 100%;
    display: flex;
    margin-bottom: 30px;
  }

  @media ${theme.device.mobileL} {
    flex-direction: column;
    margin-bottom: 0;
  }
`;
export const ExperienceBodyRight = styled.div`
  width: 25%;

  @media ${theme.device.tablet} {
    width: 100%;
    display: flex;
  }

  @media ${theme.device.mobileL} {
    flex-direction: column;
    margin-bottom: 0;
  }
`;
export const ExperienceSection = styled.div`
  &:not(:last-child) {
    margin-bottom: 30px;
    @media ${theme.device.tablet} {
      margin-bottom: 0;
    }

    @media ${theme.device.mobileL} {
      margin-bottom: 20px;
    }
  }
  
  @media ${theme.device.tablet} {
    width: 50%;
  }

  @media ${theme.device.mobileL} {
    margin-bottom: 20px;
    width: 100%;
  }
`;
export const ExperienceSectionTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.element.dark};
  margin-bottom: 8px;
`;
export const ExperienceSectionData = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const EmojiIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const Emoji = styled.div`
  width: ${props => props.size ? `${props.size}px` : "32px"};
  height: ${props => props.size ? `${props.size}px` : "32px"};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.fontSize ? `${props.fontSize}px` : "14px"};
  border: 1px solid ${theme.colors.primary.white};
  user-select: none;
  margin-right: 8px;
  ${props => props.marginBottom && css`
    margin-bottom: ${props.marginBottom};
  `}
`;

export const PlaymateWrapper = styled.div`
  display: flex;
  margin: 0 8px 8px 0;
`;

export const AperitifWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;
