import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex, LineClamp } from '../../js/Mixins';
import theme from '../../theme';

export const ProductDetailsContainer = styled.div`
`;

export const Header = styled.div`
  ${DisplayFlex({justifyContent: 'space-between'})};
  margin-top: 20px;
  margin-bottom: 40px;

  @media ${theme.device.mobileL} {
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

  @media ${theme.device.mobileL} {
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
    cursor: pointer;
    color: ${theme.colors.element.dark};
    &:not(:last-child)::after {
      content: ',';
      margin-right: 4px;
    }

    &:hover {
      color: ${theme.colors.mainBrandColors.dark};
    }
  }
`;

export const ReleaseDate = styled.div`
  ${DisplayFlex({alignItems: 'center'})};

  @media ${theme.device.mobileL} {
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

  @media ${theme.device.mobileL} {
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
  ${DisplayFlex({alignItems: 'flex-start', justifyContent: 'flex-start'})};
  flex-wrap: wrap;
  margin-top: 20px;

  @media ${theme.device.mobileL} {
    margin-top: 0;
  }
`;

export const InfoCrew = styled.div`
  width: calc(25% - 10px);
  min-width: 120px;

  @media ${theme.device.mobileL} {
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

  @media ${theme.device.mobileL} {
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

  @media ${theme.device.mobileL} {
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

  @media ${theme.device.mobileL} {
    margin-bottom: 40px;
    width: 240px;
  }
`;

export const CastSection = styled.div``;

export const VideoAndInfoSection = styled.div`
  ${DisplayFlex({alignItems: 'start'})};
  margin-top: 40px;

  @media ${theme.device.mobileL} {
    flex-direction: column;
  }
`;
export const VideoSection = styled.div`
  width: 65%;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${theme.colors.component.dark};

  @media ${theme.device.mobileL} {
    width: 100%;
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

  @media ${theme.device.mobileL} {
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

  ${props => props.row && css`
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    height: fit-content;
  `}

  @media ${theme.device.mobileL} {
    width: 100%;;
    margin-left: 0;
    margin-top: 20px;
    height: fit-content;
  }
`;

export const InfoSectionWrapperElement = styled.div`
  ${props => props.row && css`
    display: flex;
    flex-wrap: wrap;
  `}
  @media ${theme.device.mobileL} {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const InfoSectionElement = styled.div`
  margin-top: 20px;

  ${props => props.row && css`
    &:not(:last-child) {
      margin-right: 20px;
    }
  `}

  @media ${theme.device.mobileL} {

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export const MediaSection = styled.div`
  margin-top: 40px;
  ${DisplayFlex({alignItems: 'flex-start'})};

  @media ${theme.device.mobileL} {
    flex-direction: column;
  }
`;
export const MediaSectionGallery = styled.div`
  width: 65%;

  @media ${theme.device.mobileL} {
    width: 100%;
  }
`;
export const MediaSectionGalleryHeader = styled.div`
  ${DisplayFlex({alignItems: 'center', justifyContent: 'space-between'})};
  margin-right: 20px;
`;
export const MediaSectionGalleryImages = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
  margin-top: 20px;
  flex-wrap: wrap;
  .gallery-images-image {
    margin-bottom: 20px;
    width: calc(100% / 3 - 20px);
    img {
      border-radius: 20px;
    }

    &:nth-child(1), &:nth-child(2) {
      width: calc(50% - 20px);
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export const MediaSectionImage = styled.div`
  cursor: pointer;
  background-image: ${props => `url(${props.srcImages})`};
  height: 125px;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  border-radius: 20px;
  margin-bottom: 20px;
    width: calc(100% / 3 - 20px);
    img {
      border-radius: 20px;
    }

    &:nth-child(1), &:nth-child(2) {
      width: calc(50% - 20px);
      height: 194px;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
    

    @media ${theme.device.mobileM} {
      &:first-child {
        width: 100%;
      }

      &:nth-child(2) {
        height: 125px;
      }

      width: calc(50% - 20px);
    }
`;

export const MediaSectionInfo = styled.div`
  width: 35%;
  margin-top: 50px;

  @media ${theme.device.mobileL} {
    width: 100%;
  }
`;

export const MediaSectionInfoTitle = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
  margin-bottom: 10px;

  .icon-media-info-title {
    margin-right: 5px;
  }
`;

export const MediaSectionInfoKeywords = styled.div``;
export const MediaSectionInfoKeywordsList = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
  flex-wrap: wrap;
`;
export const Keyword = styled.div`
  cursor: pointer;
  border: 1px solid ${theme.colors.element.light};
  padding: 2px 4px;
  margin-bottom: 5px;
  border-radius: 3px;

  &:hover {
    background-color: ${theme.colors.mainBrandColors.dark};
    border: 1px solid ${theme.colors.mainBrandColors.dark};
  } 

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
export const MediaSectionInfoExternal = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
  margin-top: 20px;
  @media ${theme.device.mobileL} {
    flex-direction: column;
  }
`;
export const MediaSectionInfoExternalLeft = styled.div`
  width: calc(65% - 10px);
  @media ${theme.device.mobileL} {
    width: 100%;
  }
`;
export const MediaSectionInfoExternalRight = styled.div`
  width: calc(35% - 10px);
  @media ${theme.device.mobileL} {
    width: 100%;
    margin-top: 30px;
  }
`;

export const MediaSectionInfoExternalToWatch = styled.div`
  .title-media-section-info-external {
    text-transform: uppercase;
    margin-top: 10px;
  }
`;

export const MediaSectionInfoExternalList = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
  flex-wrap: wrap;
`;

export const ExternalElm = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-image: ${props => `url(https://image.tmdb.org/t/p/original${props.imageUrl})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 5px;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export const LinkSocialWrapper = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
`;
export const LinkSocial = styled.a`
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export const CollectionSection = styled.div`
  margin-top: 40px;
  margin-bottom: 90px;
  width: 100%;
  height: 170px;
  padding: 25px 40px;
  background: ${props => `linear-gradient(113.38deg, rgba(57, 55, 77, 0.8) -0.12%, rgba(21, 21, 21, 0.8) 107.47%), url(https://image.tmdb.org/t/p/original${props.imageBg})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 16px;
  ${DisplayFlex({alignItems: 'flex-start', justifyContent: 'space-between'})};

  @media ${theme.device.mobileL} {
    height: 240px;
    flex-direction: column;
    margin-bottom: 110px;
  }

  @media ${theme.device.mobileM} {
    height: 300px;
    padding: 25px 20px;
  }
`;
export const CollectionInfo = styled.div`
  width: fit-content;
  height: 100%;
  max-width: 45%;
  ${DisplayFlex({alignItems: 'flex-start', justifyContent: 'space-between'})}
  flex-direction: column;

  @media ${theme.device.mobileL} {
    width: 100%;
    max-width: 100%;
    flex-direction: row;
    align-items: flex-end;
  }

  @media ${theme.device.mobileM} {
    flex-direction: column;
    align-items: start;
  }
`;
export const CollectionInfoTop = styled.div`
  .collection-title {
    margin-top: 5px;
    ${LineClamp({numLines: 2})};
  }
`;
export const CollectionInfoBottom = styled.div`
  .collection-action-btn {
    width: fit-content;
    padding: 12px 16px;
  }

  @media ${theme.device.mobileL} {
    margin-top: 20px;
  }
`;
export const CollectionList = styled.div`
  ${DisplayFlex({alignItems: 'center'})};

  @media ${theme.device.mobileL} {
    justify-content: center;
    width: 100%;
    margin-top: 30px;
  }
`;

export const CollectionPart = styled.div`
  cursor: pointer;
  width: 129px;
  height: 194px;
  border-radius: 5px;
  background-image: ${props => `url(https://image.tmdb.org/t/p/original${props.imgPoster})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &:hover {
    outline: 2px solid ${theme.colors.mainBrandColors.light};
  }

  &:not(:last-child) {
    margin-right: 25px;
  }
`;

export const RecommendationsSection = styled.div`
`;