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
  margin-bottom: 40px;
  background: ${props => `linear-gradient(113.38deg,rgba(57,55,77,0.8) -0.12%,rgba(21,21,21,0.8) 107.47%),url(${props.srcImg})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${theme.colors.component.dark};
  border-radius: 16px;
  padding: 20px 25px;

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
  padding-top: 25px;

  .header-title-season {
    margin-bottom: 10px;
    color: ${theme.colors.element.dark};
    @media ${theme.device.mobileL} {
      text-align: center;
    }
  }
  .header-title-season-number {
    color: ${theme.colors.element.light};
  }
  
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
  max-width: 151px;

  img {
    border-radius: 5px;
    background: ${theme.colors.component.light};
  }

  @media ${theme.device.mobileL} {
    width: 240px;
    margin: 0 auto;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .card {
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const CardSeasons = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 15px 30px;
  background-color: ${theme.colors.component.dark};
  border-radius: 20px;
  ${DisplayFlex({alignItems: 'flex-start'})};

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  @media ${theme.device.mobileL} {
    flex-direction: column;
    align-items: center;
  }
`;

export const CardLeft = styled.div`
  margin-right: 20px;
  .main-image {
    img {
      border-radius: 20px;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export const CardRight = styled.div``;
export const CardRightTitle = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
  color: ${theme.colors.element.light};
  
  .card-season-title {
    color: ${theme.colors.element.dark};
  }
`;
export const CardRightOverview = styled.div`
  ${LineClamp({numLines: 4})};
`;