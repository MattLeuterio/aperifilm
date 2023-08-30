import { useEffect, useState } from 'react';
import { Image } from '../../atoms';
import { Header, Sidebar } from '../index';
import { WelcomeBanner } from '..';
import { Container, Content, Main } from './style';
import LogoAperifilm from "../../assets/images/logo-aperifilm.svg";
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { FullScreenPanel, ModalVote } from ".."
import { ModalDelete, ModalExperience, ModalShare } from '../Modals';

const GlobalLayout = ({ children }) => {
	const user = useSelector((state) => state.userData);
	const [listImages, setListImages] = useState([]);
	const [votePanelSelected, setModalVoteSelected] = useState({});
	const [modalExperienceSelected, setModalExperienceSelected] = useState({});
	const [modalShareSelected, setModalShareSelected] = useState({});
	const [modalDeleteSelected, setModalDeleteSelected] = useState({});
	const listFullScreenPanel = useSelector((state) => state.app?.fullScreenPanel?.list);
	const selectedVotePanel = useSelector((state) => state.app?.modalVote?.selected);
	const selectedModalExperience = useSelector((state) => state.app?.modalExperience?.selected);
	const selectedModalShare = useSelector((state) => state.app?.modalShare?.selected);
	const selectedModalDelete = useSelector((state) => state.app?.modalDelete?.selected);
	
	useEffect(() => {
		setListImages(listFullScreenPanel)
	}, [listFullScreenPanel])

	useEffect(() => {
		setModalVoteSelected(selectedVotePanel)
	}, [selectedVotePanel])

	useEffect(() => {
		setModalExperienceSelected(selectedModalExperience)
	}, [selectedModalExperience])

	useEffect(() => {
		setModalShareSelected(selectedModalShare)
	}, [selectedModalShare])
	useEffect(() => {
		setModalDeleteSelected(selectedModalDelete)
	}, [selectedModalDelete])
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
				<ModalVote selected={votePanelSelected} />
				<ModalExperience selected={modalExperienceSelected} />
				<ModalDelete selected={modalExperienceSelected} />
				<ModalShare selected={modalShareSelected} />
			</>
	)
};

export default GlobalLayout;