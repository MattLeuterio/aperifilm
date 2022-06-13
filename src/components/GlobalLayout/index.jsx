import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../index';
import { Container, Content, Main } from './style';

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