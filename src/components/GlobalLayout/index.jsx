import { useEffect, useState } from 'react';
import { Image } from '../../atoms';
import { Header, Sidebar } from '../index';
import { WelcomeBanner } from '..';
import { Container, Content, Main } from './style';
import LogoAperifilm from "../../assets/images/logo-aperifilm.svg";
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { FullScreenPanel, VotePanel } from ".."

const GlobalLayout = ({ children }) => {
	const user = useSelector((state) => state.userData);
	const [listImages, setListImages] = useState([]);
	const [votePanelSelected, setVotePanelSelected] = useState({});
	const listFullScreenPanel = useSelector((state) => state.app?.fullScreenPanel?.list);
	const selectedVotePanel = useSelector((state) => state.app?.votePanel?.selected);
	
	useEffect(() => {
		setListImages(listFullScreenPanel)
	}, [listFullScreenPanel])

	useEffect(() => {
		setVotePanelSelected(selectedVotePanel)
	}, [selectedVotePanel])
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

				<FullScreenPanel list={listImages} />
				<VotePanel selected={votePanelSelected} />
			</>
	)
};

export default GlobalLayout;