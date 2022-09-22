import { useEffect, useState } from 'react';
import { Image } from '../../atoms';
import { Header, Sidebar } from '../index';
import { WelcomeBanner } from '..';
import { Container, Content, Main } from './style';
import LogoAperifilm from "../../assets/images/logo-aperifilm.svg";
import { useSelector } from 'react-redux';
import Head from 'next/head';

const GlobalLayout = ({ children }) => {
	const user = useSelector((state) => state.userData);
	return (
			<>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
				</Head>
				<Container>
					<Sidebar />
					<Content>
						<Header />
						<Main>
							{!user?.email && (
								<WelcomeBanner />
							)}
							{ children }
						</Main>
					</Content>
				</Container>
			</>
	)
};

export default GlobalLayout;