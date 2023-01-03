import theme from '../../theme';
import { Welcome, FullScreenPanelContainer, WelcomeDescription, WelcomeTitle, VotePanelContainer, MainContainer, VoteContainer, ButtonsContainer, Button, VoteBottlesContainer, VoteBottleContainer, VoteBottle, HoverContainer, DeleteContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon, Image } from '../../atoms';
import { Router, useRouter } from 'next/router';
import { XCircleIcon } from '@heroicons/react/outline';
import AperitifBottleWhite from "../../assets/icons/aperitif-bottle-disable.png"
import AperitifBottleHalf from "../../assets/icons/aperitif-bottle-half.png"
import Montserrat from '../../typography/montserrat';
import IconWelcome from "../../assets/icons/apericheers-red.png";
import { useDispatch, useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/solid';
import { setFullscreenPanel, setVotePanel } from '../../store/actions/appAction';
import SliderFullScreen from '../Sliders/SliderFullScreen';
import useMediaQuery from '../../hooks/useMediaQuery';
import FullBottle from '../../assets/icons/aperitif-bottle-full.svg';
import HalfBottle from '../../assets/icons/aperitif-bottle-half.svg';
import EmptyBottle from '../../assets/icons/aperitif-bottle-empty.svg';
import { updateUser } from '../../../pages/api/auth/users';
import { setUserProducts } from '../../store/actions/userDataAction';
import { wasItVoted } from '../../js/utility';


const VotePanel = ({
}) => {
	const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);
	const router = useRouter();
	const dispatch = useDispatch();
	const voteStateIsOpen = useSelector((state) => state.app.votePanel?.isOpen);
	const voteStateSelected = useSelector((state) => state.app.votePanel?.selected);
	const userDataListProductsRedux = useSelector((state) => state.userData.list_products);
	const userData = useSelector((state) => state.userData)

	const [vote, setVote] = useState(undefined);

	useEffect(() => {
		if (Boolean(userDataListProductsRedux)) {
			const elementAlreadyVoted = userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === voteStateSelected.id).length > 0;
			if(elementAlreadyVoted) {
				setVote(userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === voteStateSelected.id)[0]?.user_vote);
			}
		}
	}, [voteStateIsOpen])

	const handleOnClickVote = (type, value) => {
		setVote(value);
	}
	
	const handleOnClose = () => {
		dispatch(setVotePanel({isOpen: false, selected: {}}));
		setVote(undefined);
	}

	const handleOnConfirmVote = () => {
		const isMovie = Boolean(voteStateSelected.title);

		const elementAlreadyVoted = userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === voteStateSelected.id).length > 0;

		if (!elementAlreadyVoted) {
			const json = {
				...userDataListProductsRedux[0]?.lists,
				"vote": [
					...userDataListProductsRedux[0].lists.vote,
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
					"translate": userData.translate,
					"list_products": JSON.stringify(json)
			}
			updateUser(userData.record_id, body);
			dispatch(setUserProducts(json));
		} else {
			const updateProduct = userData.list_products[0].lists.vote.filter(el => el.id === voteStateSelected.id);
			const listWithoutUpdatedProduct = userData.list_products[0].lists.vote.filter(el => el.id !== voteStateSelected.id);

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
				...userDataListProductsRedux[0].lists,
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
				"translate": userData.translate,
				"list_products": JSON.stringify(json)
			}
			updateUser(userData.record_id, body);
			dispatch(setUserProducts(json));

		}

		handleOnClose();
	}

	const handleOnDeleteVote = () => {
		const elementAlreadyVoted = userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === voteStateSelected.id).length > 0;

		if (elementAlreadyVoted) {
			const newVoteList = userData.list_products[0].lists.vote.filter(el => el.id !== voteStateSelected.id);

			const json = {
				...userDataListProductsRedux[0].lists,
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
				"translate": userData.translate,
				"list_products": JSON.stringify(json)
			}
			updateUser(userData.record_id, body);
			dispatch(setUserProducts(json));
			setVote(undefined);
		} else {
			setVote(undefined);
		}
	}

	return (
		<>
			{voteStateIsOpen && (
				<VotePanelContainer
				>
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
					<MainContainer>
						<Montserrat configuration={{fontSize: isTablet ? 20 : 28, fontWeight: 600, color: theme.colors.mainBrandColors.dark}}>
							<FormattedMessage defaultMessage={"votePanelTitle"} id={"votePanelTitle"} />
						</Montserrat>
						<Montserrat className="vote-title-product" configuration={{fontSize: isTablet ? 24 : 36, fontWeight: 600}}>
							{voteStateSelected?.title}
						</Montserrat>

						<VoteContainer>
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

							{(vote !== undefined || vote > 0) && (
								<DeleteContainer>
									<Button
										className='vote-btn delete'
										onClick={() => handleOnDeleteVote()}
										disable={vote}
									>
										<Montserrat>
											<FormattedMessage defaultMessage={"votePanelButtonDelete"} id={"votePanelButtonDelete"} />
										</Montserrat>
									</Button>
								</DeleteContainer>
							)}
						</VoteContainer>


						<ButtonsContainer>
							<Button
								className='vote-btn cancel'
								onClick={() => handleOnClose()}
								disable={false}
								
              >
								<Montserrat>
									<FormattedMessage defaultMessage={"votePanelButtonCancel"} id={"votePanelButtonCancel"} />
								</Montserrat>
              </Button>
							<Button
								className='vote-btn confirm'
								onClick={() => handleOnConfirmVote()}
								disable={vote}
              >
								<Montserrat>
									<FormattedMessage defaultMessage={"votePanelButtonConfirm"} id={"votePanelButtonConfirm"} />
								</Montserrat>
              </Button>
						</ButtonsContainer>
					</MainContainer>
				</VotePanelContainer>
			)}
		</>
	)
};


VotePanel.defaultProps = {
}

export default VotePanel;