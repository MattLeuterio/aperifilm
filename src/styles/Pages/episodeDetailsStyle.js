import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex, LineClamp } from '../../js/Mixins';
import { imgBasePath } from '../../js/utility';
import theme from '../../theme';

export const ProductDetailsContainer = styled.div`
`;

export const Header = styled.div`
  ${DisplayFlex({justifyContent: 'space-between'})};
  margin-top: 20px;
  border-radius: 16px;

  @media ${theme.device.mobileL} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderLeft = styled.div`
  margin-right: 20px;

  @media ${theme.device.mobileL} {
    margin-bottom: 40px;
    width: 240px;
  }

`;

export const HeaderInfo = styled.div`
  width: 100%;
  margin-bottom: 10px;

  .header-title-season {
    margin-bottom: 10px;
    color: ${theme.colors.element.dark};
  }
  .header-title-season-number {
    color: ${theme.colors.element.light};
  }
  
`;

export const HeaderInfoDatas = styled.div`
  width: 100%;
  ${DisplayFlex({alignItems: 'center'})};

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

export const HeaderInfoSummary = styled.div`
  margin-top: 20px;
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

export const HeaderInfoTitle = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const HeaderCover = styled.div`
  width: 219px;
  height: 143px;

  img {
    border-radius: 5px;
    background: ${theme.colors.component.light};
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${theme.device.mobileL} {
    width: 240px;
  }
`;

export const HeaderInfoData = styled.div`
  width: 100%;
  ${DisplayFlex({alignItems: 'center'})};

  @media ${theme.device.mobileL} {
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    background-color: #181a2436;
    padding: 20px;
    border-radius: 9px;
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
    margin-left: 0;
  }

  .icon-date {
    margin-right: 5px;
  }
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

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  
  .info-crew-name {
    cursor: pointer;
    margin-top: 5px;

    &:hover {
      color: ${theme.colors.mainBrandColors.light};
    }
  }
`;

export const SectionContainer = styled.div`
  margin-top: 40px;
`;

export const GuestStarsResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  .card {
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }

  @media ${theme.device.mobileL} {
    justify-content: center;
  }
`;

export const MediaSectionImage = styled.div`
  cursor: pointer;
  background-image: ${props => `url(${props.srcImages})`};
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  border-radius: 20px;
  margin-bottom: 20px;
  width: calc(100% / 3 - 20px);
  aspect-ratio: ${props => props.version === 'posters' ? '0.667' : '1.778'};
  max-width: ${props => props.version === 'posters' ? '225px' : 'unset'};
  background-color: ${theme.colors.component.dark};
    img {
      border-radius: 20px;
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