import styled, { css } from 'styled-components';
import { sidebarWidthDSK } from '../../../const';
import { DisplayFlex, LineClamp } from '../../js/Mixins';
import theme from '../../theme';

export const PersonDetailsContainer = styled.div`
`;

export const Container = styled.div`
  ${DisplayFlex({justifyContent: 'space-between'})};
  margin-top: 20px;
  margin-bottom: 40px;

  @media ${theme.device.mobileL} {
    flex-direction: column;
    align-items: center;
  }
`;

export const ContainerRight = styled.div`
  width: 100%;
  margin-left: 25px;

  .product-details-section-title {
    margin-bottom: 20px;
  }

  @media ${theme.device.mobileL} {
    margin-left: 0;
  }
`;

export const Biography = styled.div`
  margin-bottom: 40px;
`;

export const ContainerLeft = styled.div`
  .icon-share {
    cursor: pointer;
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
      width: 20px;
      fill: ${theme.colors.element.dark}
    }
  }
`;

export const Actions = styled.div`
  margin-top: 20px;
  ${DisplayFlex({alignItems: 'center', justifyContent: 'space-between'})};
`;
export const LeftActions = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
`;

export const PeopleCover = styled.div`
  position: relative;
  width: 270px;

  img {
    border-radius: 5px;
  }

  @media ${theme.device.mobileL} {
    margin: 0 auto;
    margin-bottom: 40px;
    width: 240px;
  }
`;

export const PeopleInfo = styled.div`
  margin-top: 20px;
  @media ${theme.device.mobileL} {
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
  }
`;
export const PeopleInfoElement = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  > div:last-child {
    margin-top: 5px;
  }

  @media ${theme.device.mobileL} {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export const ButtonImages = styled.div`
  position: absolute;
  cursor: pointer;
  right: 5px;
  bottom: 10px;
  background: rgba(48, 46, 66, 0.8);
  border-radius: 7px;
  padding: 3px 10px;
  ${DisplayFlex({alignItems: 'center'})};

  &:hover {
    background: rgba(48, 46, 66, 1);
  }

  .icon-gallery {
    margin-right: 5px;
  }
`;

export const CastSection = styled.div``;

export const LinkSocialWrapper = styled.div`
  ${DisplayFlex({alignItems: 'center'})};
`;
export const LinkSocial = styled.a`
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export const PopularProjectsSection = styled.div`
  ${DisplayFlex({alignItems: 'flex-start'})};
  flex-wrap: wrap;

  @media ${theme.device.mobileL} {
    justify-content: space-between;
  }

  @media ${theme.device.mobileM} {
    flex-direction: column;
    align-items: center;
  }
`;

export const PopularProject = styled.div`
  width: 147px;
  margin-bottom: 20px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 20px;
  }

  .popular-project-poster {
    width: 147px;
    height: 220px;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: ${theme.colors.component.light};
    border-radius: 16px;
    > img {
      border-radius: 16px;

      &:hover {
      outline: 2px solid ${theme.colors.mainBrandColors.light};
    }
    }

  }

  @media ${theme.device.mobileL} {

    &:not(:last-child) {
      margin-right: 0;
    }
  }
`;

export const ListProductsSection = styled.div``;

export const FilteringWrapper = styled.div`
  ${DisplayFlex({alignItems: 'center', justifyContent: 'space-between'})};
  margin-bottom: 20px;
`;

export const ListProductsTable = styled.div`
  background-color: ${theme.colors.component.light};
  border-radius: 12px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  ${DisplayFlex({alignItems: 'center', justifyContent: 'flex-start'})};
  padding: 30px 30px 15px;
  background-color: ${theme.colors.component.dark};
  border-bottom: 1px solid ${theme.colors.element.light};
`;

export const TableHeaderElement = styled.div`
  font-weight: 600;
  &.table-header {
    &-year {
      width: 15%;
      margin-right: 10px;
    }
    &-title {
      width: 60%;
      margin-right: 10px;
    }
    &-job {
      width: 25%;
    }
  }
`;

export const TableResults = styled.div``;

export const TableResultElement = styled.div`
  padding: 15px 30px;
  ${DisplayFlex({alignItems: 'center', justifyContent: 'flex-start'})};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.component.dark};
  }
`;

export const ElementYear = styled.div`
  width: 15%;
  font-weight: 600;
  margin-right: 10px;
`;

export const ElementTitle = styled.div`
  width: 60%;
  margin-right: 10px;
`;

export const ElementJob = styled.div`
  width: 25%;
  font-weight: 600;
`;

export const TableFooter = styled.div`
  height: 30px;
  background-color: ${theme.colors.component.dark};
  border-top: 1px solid ${theme.colors.element.light};
`;