import { useEffect, useState } from 'react';
import { Image } from '../../atoms';
import { Header, Sidebar } from '../index';
import { Container, Content, Main } from './style';
import LogoAperifilm from "../../assets/images/logo-aperifilm.svg";

const GlobalLayout = ({ children }) => {
	return (
			<Container>
        <Sidebar />
				<Content>
					<Header />
					<Main>
						{ children }
					</Main>
				</Content>
			</Container>
	)
};

export default GlobalLayout;