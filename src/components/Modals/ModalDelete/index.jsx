import theme from '../../../theme';
import { VotePanelContainer, ButtonsContainer, Button, VoteBottlesContainer, VoteBottleContainer, VoteBottle, HoverContainer, BackgroundOpacity, Header, Body, Footer } from './style';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon } from '../../../atoms';
import { useRouter } from 'next/router';
import Montserrat from '../../../typography/montserrat';
import { useDispatch, useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/solid';
import { setModalDelete } from '../../../store/actions/appAction';
import useMediaQuery from '../../../hooks/useMediaQuery';
import FullBottle from '../../../assets/icons/aperitif-bottle-full.svg';
import HalfBottle from '../../../assets/icons/aperitif-bottle-half.svg';
import EmptyBottle from '../../../assets/icons/aperitif-bottle-empty.svg';
import { updateUser } from '../../../../pages/api/auth/users';
import { setUserProducts } from '../../../store/actions/userDataAction';
import toast, { Toaster } from 'react-hot-toast';


const ModalDelete = ({
}) => {
	const isTablet = useMediaQuery(769);
	const router = useRouter();
	const dispatch = useDispatch();
	const modalStateIsOpen = useSelector((state) => state.app.modalDelete?.isOpen);
	const modalStateSelected = useSelector((state) => state.app.modalDelete?.selected);
	const userDataListProductsRedux = useSelector((state) => state.userData.list_products);
	const userData = useSelector((state) => state.userData)

	const [vote, setVote] = useState(undefined);

	useEffect(() => {
		if (Boolean(userDataListProductsRedux)) {
			const elementAlreadyVoted = userDataListProductsRedux?.vote?.filter(el => el.id === modalStateSelected.id).length > 0;
			if(elementAlreadyVoted) {
				setVote(userDataListProductsRedux?.vote?.filter(el => el.id === modalStateSelected.id)[0]?.user_vote);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalStateIsOpen])

	
	const handleOnClose = () => {
		dispatch(setModalDelete({isOpen: false, selected: {}}));
	}

	const handleOnConfirm = () => {
		const newList = userDataListProductsRedux?.experience?.filter(el => el.id !== modalStateSelected.id);
		
		const json = {
			...userDataListProductsRedux,
			"experience": newList
		};

		const body = {
			"sub": userData.sub,
			"given_name": userData.given_name,
			"family_name": userData.family_name,
			"nickname": userData.nickname,
			"picture": userData.picture,
			"locale": router.locale,
			"updated_at": userData.updated_at,
			"email": userData.email,
			"language": userData.language,
			"list_products": JSON.stringify(json)
		}
		const res = updateUser(userData.record_id, body);
		res.then((e) => {
			toast.success('toastSuccessRemoveToExperience');
			dispatch(setUserProducts(json));
		}).catch((err) => {
			toast.error('toastErrorDefault')
			setIsActive(true);
		})

		handleOnClose();
	};

	return (
		<>
			{modalStateIsOpen && (
				<>
					<BackgroundOpacity onClick={(e) => handleOnClose(e)}></BackgroundOpacity>
					<VotePanelContainer
					>
						{/* ICON CLOSE - position absolute */}
						<Icon
							handleOnClick={() => handleOnClose()}
							className="icon-close"
							width="40px"
							height="40px"
							fill={theme.colors.element.light}
							stroke='transparent'
						>
							<XIcon />
						</Icon>

						<Header>
							<Montserrat 
								className={"modal-title"} 
								configuration={
									{
										fontSize: isTablet ? 24 : 32, 
										fontWeight: 600, 
										color: theme.colors.element.light,
										textAlign: "center",
									}
								}
							>
								{modalStateSelected?.title}
							</Montserrat>
						</Header>

						<Body>
							<Montserrat 
								className={"modal-subtitle"} 
								configuration={
									{
										fontSize: isTablet ? 14 : 16, 
										color: theme.colors.element.light,
										textAlign: "center",
									}
								}
							>
								<FormattedMessage defaultMessage={"modalDeleteMessage"} id={"modalDeleteMessage"} />
							</Montserrat>
						</Body>

						<Footer>
							<ButtonsContainer>
								<Button
									className='vote-btn cancel'
									onClick={() => handleOnClose()}
									disable={false}
								>
									<Montserrat>
										<FormattedMessage defaultMessage={"voteModalButtonCancel"} id={"voteModalButtonCancel"} />
									</Montserrat>
								</Button>
								<Button
									className='vote-btn confirm'
									onClick={() => handleOnConfirm()}
									disable={false}
								>
									<Montserrat>
										<FormattedMessage defaultMessage={"voteModalButtonConfirm"} id={"voteModalButtonConfirm"} />
									</Montserrat>
								</Button>
							</ButtonsContainer>
						</Footer>
					</VotePanelContainer>
				</>
			)}
		</>
	)
};


ModalDelete.defaultProps = {
}

export default ModalDelete;