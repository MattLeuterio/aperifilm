import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex } from '../../js/Mixins';
import theme from '../../theme';

export const ProductDetailsContainer = styled.div`
`;

export const Header = styled.div`
  ${DisplayFlex({justifyContent: 'space-between'})};
  margin-top: 20px;
  margin-bottom: 40px;

  @media ${theme.device.tablet} {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const HeaderInfo = styled.div`
  width: 100%;
`;

export const HeaderInfoDatas = styled.div`
  width: 100%;
  ${DisplayFlex({alignItems: 'center', justifyContent: 'space-between'})};

  @media ${theme.device.tablet} {
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    background-color: #181a2436;
    padding: 20px;
    border-radius: 9px;
  }
`;

export const HeaderInfoDatasLeft = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
`;

export const HeaderInfoDatasRight = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
`;

export const HeaderInfoDatasGenres = styled.div`
  margin-left: 10px;

  .header-info-genre {
    color: ${theme.colors.element.dark};
    &:not(:last-child)::after {
      content: ',';
      margin-right: 4px;
    }
  }
`;

export const ReleaseDate = styled.div`
  ${DisplayFlex({alignItems: 'center'})};

  @media ${theme.device.tablet} {
    margin-left: 0;
    margin-top: 10px;
  }
  
  .icon-date {
    margin-right: 5px;
  }
`;

export const Runtime = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
  margin-left: 10px;

  @media ${theme.device.tablet} {
    margin-top: 10px;
  }

  .icon-date {
    margin-right: 5px;
  }
`;

export const HeaderInfoSummary = styled.div`
  margin-top: 10px;
`;

export const HeaderInfoCrew = styled.div`
  ${DisplayFlex({alignItems: 'flex-start', justifyContent: 'space-between'})};
  flex-wrap: wrap;
  margin-top: 20px;

  @media ${theme.device.tablet} {
    margin-top: 0;
  }
`;

export const InfoCrew = styled.div`
  width: calc(25% - 10px);
  min-width: 120px;

  @media ${theme.device.tablet} {
    margin-top: 20px;
  }
  
  .info-crew-name {
    cursor: pointer;
    margin-top: 5px;

    &:hover {
      color: ${theme.colors.mainBrandColors.light};
    }
  }
`;

export const HeaderInfoVoteActions = styled.div`
  ${DisplayFlex({alignItems: 'flex-end', justifyContent: 'space-between'})};
  margin-top: 20px;

  @media ${theme.device.tablet} {
    flex-direction: column;
    align-items: center;
  }

  .icon-share {
    background-color: ${theme.colors.component.dark};
    padding: 2px;
    width: 40px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9px;
    margin-left: 5px;

    > svg {
      width: 25px;
      fill: ${theme.colors.element.dark}
    }
  }
`;

export const HeaderInfoVoteActionsLeft = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};

  @media ${theme.device.tablet} {
    margin-bottom: 20px;
  }

`;
export const HeaderInfoVoteActionsRight = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
`;

export const HeaderInfoVote = styled.div`
  ${DisplayFlex({alignItems: 'center', justifyContent: 'center'})};
  flex-direction: column;
  width: fit-content;

  &:not(:last-child) {
    margin-right: 10px;
  }

  .info-vote {
    margin-bottom: 5px;
  }
`;

export const HeaderCover = styled.div`
  width: 270px;
  margin-left: 20px;

  img {
    border-radius: 5px;
  }

  @media ${theme.device.tablet} {
    margin-bottom: 40px;
    width: 240px;
  }
`;

export const CastSection = styled.div``;

export const VideoAndInfoSection = styled.div`
  ${DisplayFlex({alignItems: 'start'})};
  margin-top: 40px;

  @media ${theme.device.tablet} {
    flex-direction: column;
  }
`;
export const VideoSection = styled.div`
  width: 65%;
  border-radius: 20px;
  overflow: hidden;

  @media ${theme.device.tablet} {
    width: 100%;;
  }
`;

export const BackdropSection = styled.div`
  background-image: ${props => `url(https://image.tmdb.org/t/p/original${props.url})`};
  width: 65%;
  height: 360px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 20px;

  @media ${theme.device.tablet} {
    width: 100%;;
  }
`;
export const InfoSection = styled.div`
  width: 35%;
  height: 360px;
  background-color: ${theme.colors.component.dark};
  border-radius: 5px;
  padding: 20px;
  margin-left: 20px;

  @media ${theme.device.tablet} {
    width: 100%;;
    margin-left: 0;
    margin-top: 20px;
    height: fit-content;
  }
`;

export const InfoSectionWrapperElement = styled.div`
  @media ${theme.device.tablet} {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const InfoSectionElement = styled.div`
  margin-top: 20px;

  @media ${theme.device.tablet} {

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;