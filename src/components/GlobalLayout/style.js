import styled from 'styled-components';
import { 
  maxWidth, sidebarWidthDSK,  HeaderHeightDSK, HeaderHeightMOB 
} from '../../../const';

export const Container = styled.div`
  position: relative;
  max-width: ${maxWidth};
  margin: 0 auto;
  display: flex;

  @media ${props => props.theme.device.tabletL} {
    aside.sidebar {
      display: none;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  width: calc(100% - ${sidebarWidthDSK});
  margin-left: ${sidebarWidthDSK};

  @media ${props => props.theme.device.tabletL} {
    width: 100%;
    margin-left: 0;
  }
`;

export const Main = styled.main`
  min-height: calc(100vh - ${HeaderHeightDSK});
  overflow-x: hidden;
  padding: 0 20px;
  padding-bottom: 100px;
  @media ${props => props.theme.device.tabletL} {
    padding: 20px;
    padding-bottom: 100px;
  }
`;

