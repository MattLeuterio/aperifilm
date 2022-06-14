import styled from 'styled-components';
import { 
  maxWidth, sidebarWidthDSK,  HeaderHeightDSK 
} from '../../../const';

export const Container = styled.div`
  position: relative;
  max-width: ${maxWidth};
  margin: 0 auto;
  display: flex;
`;

export const Content = styled.div`
  position: relative;
  width: calc(100% - ${sidebarWidthDSK});
  margin-left: ${sidebarWidthDSK};
`;

export const Main = styled.main`
  min-height: calc(200px + 100vh - ${HeaderHeightDSK});
  overflow-x: hidden;
`;

