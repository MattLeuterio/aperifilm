import theme from '../../../theme';
import { VotePanelContainer, ButtonsContainer, Button, VoteBottlesContainer, VoteBottleContainer, VoteBottle, HoverContainer, BackgroundOpacity, Header, Body, Footer } from './style';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon } from '../../../atoms';
import { useRouter } from 'next/router';
import Montserrat from '../../../typography/montserrat';
import { useDispatch, useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/solid';
import { setModalVote } from '../../../store/actions/appAction';
import useMediaQuery from '../../../hooks/useMediaQuery';
import FullBottle from '../../../assets/icons/aperitif-bottle-full.svg';
import HalfBottle from '../../../assets/icons/aperitif-bottle-half.svg';
import EmptyBottle from '../../../assets/icons/aperitif-bottle-empty.svg';
import { updateUser } from '../../../../pages/api/auth/users';
import { setUserProducts } from '../../../store/actions/userDataAction';
import toast, { Toaster } from 'react-hot-toast';


const ModalVote = ({
}) => {
	const isTablet = useMediaQuery(769);
	const router = useRouter();
	const dispatch = useDispatch();
	const voteStateIsOpen = useSelector((state) => state.app.modalVote?.isOpen);
	const voteStateSelected = useSelector((state) => state.app.modalVote?.selected);
	const userDataListProductsRedux = useSelector((state) => state.userData.list_products);
	const userData = useSelector((state) => state.userData)

	const [vote, setVote] = useState(undefined);

	useEffect(() => {
		if (Boolean(userDataListProductsRedux)) {
			const elementAlreadyVoted = userDataListProductsRedux?.vote?.filter(el => el.id === voteStateSelected.id).length > 0;
			if(elementAlreadyVoted) {
				setVote(userDataListProductsRedux?.vote?.filter(el => el.id === voteStateSelected.id)[0]?.user_vote);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [voteStateIsOpen])

	const handleOnClickVote = (type, value) => {
		setVote(value);
	}
	
	const handleOnClose = () => {
		dispatch(setModalVote({isOpen: false, selected: {}}));
		setVote(undefined);
	}

	const handleOnConfirmVote = () => {
		const elementAlreadyVoted = userDataListProductsRedux?.vote?.filter(el => el.id === voteStateSelected.id).length > 0;

		if (!elementAlreadyVoted) {
			const json = {
				...userDataListProductsRedux,
				"vote": [
					...userDataListProductsRedux?.vote,
					{ 
						en: voteStateSelected.en,
						it: voteStateSelected.it,
						id: voteStateSelected.id, 
						title: voteStateSelected.title || voteStateSelected.name, 
						product_type: voteStateSelected.product_type,
						user_vote: vote
					}
				]
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

		if (Boolean(voteStateSelected.en) || Boolean(voteStateSelected.it) && Boolean(voteStateSelected.id)) {
			const res = updateUser(userData.record_id, body);
			res.then((e) => {
				toast.success('toastSuccessAddToVote');
				dispatch(setUserProducts(json));
			}).catch((err) => {
				toast.error('toastErrorDefault')
				//setIsActive(true);
			})
		}
		} else {
			const updateProduct = userData.list_products?.vote.filter(el => el.id === voteStateSelected.id);
			const listWithoutUpdatedProduct = userData.list_products?.vote.filter(el => el.id !== voteStateSelected.id);

			const newVoteList = [
				...listWithoutUpdatedProduct,
				{
					id: updateProduct[0].id,
					title: updateProduct[0].title,
					product_type: updateProduct[0].product_type,
					user_vote: vote
				}
			]

			const json = {
			...userDataListProductsRedux,
				"vote": newVoteList
			}
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
				toast.success('toastSuccessUpdateVote');
				dispatch(setUserProducts(json));
			}).catch((err) => {
				toast.error('toastErrorDefault')
				setIsActive(true);
			})

		}

		handleOnClose();
	}

	const handleOnDeleteVote = () => {
		const elementAlreadyVoted = userDataListProductsRedux?.vote?.filter(el => el.id === voteStateSelected.id).length > 0;

		if (elementAlreadyVoted) {
			const newVoteList = userData.list_products?.vote.filter(el => el.id !== voteStateSelected.id);

			const json = {
				...userDataListProductsRedux,
				"vote": newVoteList
			}
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
				toast.success('toastSuccessRemoveToVote');
				dispatch(setUserProducts(json));
			}).catch((err) => {
				toast.error('toastErrorDefault')
				setIsActive(true);
			})
			setVote(undefined);
		} else {
			setVote(undefined);
		}
	}

	const handleOnNextStep = () => {
		
	}

	const handleOnSkipStep = () => {
		
	}

	const handleOnPrevtStep = () => {

	}

	return (
		<>
			{voteStateIsOpen && (
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
								{voteStateSelected?.title}
							</Montserrat>
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
								<FormattedMessage defaultMessage={"voteModalSubtitle"} id={"voteModalSubtitle"} />
							</Montserrat>
						</Header>

						<Body>
							<VoteBottlesContainer>

								{/* BOTTLE 1 */}
								<VoteBottleContainer>
									<VoteBottle voteRange={vote === undefined ||  vote === 0} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 0.5 && vote < 1} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 1} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

									<HoverContainer
										className="hover-container half"
										onClick={() => handleOnClickVote('half', 0.5)}
									></HoverContainer>
									<HoverContainer 
										className="hover-container full"
										onClick={() => handleOnClickVote('full', 1)}
									></HoverContainer>
									<HoverContainer></HoverContainer>
								</VoteBottleContainer>

								{/* BOTTLE 2 */}
								<VoteBottleContainer>
									<VoteBottle voteRange={vote === undefined || vote <= 1} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 1.5 && vote < 2} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 2} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

									<HoverContainer
										className="hover-container half"
										onClick={() => handleOnClickVote('half', 1.5)}
									></HoverContainer>
									<HoverContainer 
										className="hover-container full"
										onClick={() => handleOnClickVote('full', 2)}
									></HoverContainer>
									<HoverContainer></HoverContainer>
								</VoteBottleContainer>

								{/* BOTTLE 3 */}
								<VoteBottleContainer>
									<VoteBottle voteRange={vote === undefined || vote <= 2} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 2.5 && vote < 3} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 3} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

									<HoverContainer
										className="hover-container half"
										onClick={() => handleOnClickVote('half', 2.5)}
									></HoverContainer>
									<HoverContainer 
										className="hover-container full"
										onClick={() => handleOnClickVote('full', 3)}
									></HoverContainer>
									<HoverContainer></HoverContainer>
								</VoteBottleContainer>

								{/* BOTTLE 4 */}
								<VoteBottleContainer>
									<VoteBottle voteRange={vote === undefined || vote <= 3} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 3.5 && vote < 4} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 4} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

									<HoverContainer
										className="hover-container half"
										onClick={() => handleOnClickVote('half', 3.5)}
									></HoverContainer>
									<HoverContainer 
										className="hover-container full"
										onClick={() => handleOnClickVote('full', 4)}
									></HoverContainer>
									<HoverContainer></HoverContainer>
								</VoteBottleContainer>

								{/* BOTTLE 5 */}
								<VoteBottleContainer>
									<VoteBottle voteRange={vote === undefined || vote <= 4} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 4.5 && vote < 5} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
									<VoteBottle voteRange={vote >= 5} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

									<HoverContainer
										className="hover-container half"
										onClick={() => handleOnClickVote('half', 4.5)}
									></HoverContainer>
									<HoverContainer 
										className="hover-container full"
										onClick={() => handleOnClickVote('full', 5)}
									></HoverContainer>
									<HoverContainer></HoverContainer>
								</VoteBottleContainer>		
							</VoteBottlesContainer>
						</Body>

						<Footer>
							<ButtonsContainer>
								<Button
									className='vote-btn cancel'
									onClick={() => handleOnDeleteVote()}
									disable={vote}
								>
									<Montserrat>
										<FormattedMessage defaultMessage={"voteModalButtonDelete"} id={"voteModalButtonDelete"} />
									</Montserrat>
								</Button>
								<Button
									className='vote-btn confirm'
									onClick={() => handleOnConfirmVote()}
									disable={vote}
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


ModalVote.defaultProps = {
}

export default ModalVote;