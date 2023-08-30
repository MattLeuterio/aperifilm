import theme from '../../theme';
import { ActionContainer, EmojiIcon, ExperienceBody, ExperienceBodyCenter, ExperienceBodyLeft, ExperienceBodyRight, ExperienceBox, ExperienceHeader, ExperienceHeaderButton, ExperienceHeaderTitle, ExperienceQuestion, ExperienceSection, ExperienceSectionData, ExperienceSectionTitle, LeftContainer, RightContainer, Emoji, PlaymateWrapper, AperitifWrapper } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Button} from '../../atoms';
import { ChevronRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../pages/api/auth/users';
import { setModalDelete, setModalExperience } from '../../store/actions/appAction';
import { formatDate, textToPath, tmdbApiKey } from '../../js/utility';
import { useUser } from '@auth0/nextjs-auth0';
import Montserrat from '../../typography/montserrat';
import ActionsProductButton from '../ActionsProductButton';
import { useRouter } from 'next/router';

const Experience = ({
	product, title, background, urlProduct
}) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { user, error, isLoading } = useUser();
	const userLanguageState = useSelector((state) => state.userData.language);
	const [userDataListProducts, setUserDataListProducts] = useState([]);
	const [isAlreadyOnTheList, setIsAlreadyOnTheList] = useState(false);
	const [productLanguage, setProductLanguage] = useState({it: {}, en: {}})
	const [situation, setSituation] = useState('main');
	const [experienceData, setExperienceData] = useState({});

	const userDataListProductsRedux = useSelector((state) => state.userData.list_products);

	useEffect(() => {
		setUserDataListProducts(userDataListProductsRedux);
	}, [userDataListProductsRedux])

	useEffect(() => {
		if (Boolean(userDataListProductsRedux)) {
			setIsAlreadyOnTheList(userDataListProductsRedux?.experience?.filter(el => el.id === product?.id).length > 0);
			setExperienceData(userDataListProductsRedux?.experience?.filter(el => el.id === product?.id)[0]?.experience);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userDataListProducts, product, updateUser])

	const getDetails = async (el) => {
		const isCollection = Boolean(el?.parts);
		const isPerson = Boolean(el?.gender);
		const isMovie = Boolean(el?.title);

		const type = isCollection ? "collection" 
			: isPerson ? "person" 
			: isMovie ? "movie" 
			: "tv";

		if (el?.id) {
			const detailsEn = await fetch(
				`https://api.themoviedb.org/3/${type}/${el?.id}?api_key=${tmdbApiKey}&language=en-EN`
				).then(res => res.json());

			const detailsIt = await fetch(
				`https://api.themoviedb.org/3/${type}/${el?.id}?api_key=${tmdbApiKey}&language=it-IT`
				).then(res => res.json());

				setProductLanguage({en: detailsEn, it: detailsIt});
		}

	}

	const handleOnClickDone = () => {
		if (user) {
			const isMovie = Boolean(product.title)
			if (user) {
				dispatch(setModalExperience({isOpen: true, selected: {
					...productLanguage,
					id: product.id, 
					title: product.name || product.title,
					product_type: isMovie ? 'movie' : 'tv',
					experienceData: {}}}))
			}
		} else {
			setSituation("login")
		}
	}

	const handleOnClickNotYet = () => {
		if (user) {
			const alreadyInListToWatch = userDataListProductsRedux?.watch?.filter(el => el.id === product?.id).length > 0;
			if(alreadyInListToWatch) {
				setSituation("alreadyInListToWatch")
			} else {
				setSituation("addToWatch")
			}
		} else {
			setSituation("addToWatch-login")
		}
	}

	useEffect(() => {
		getDetails(product)
	}, [product])

	const handleOnOpenDeleteModal = () => {
		const isMovie = Boolean(product.title)
		if (user) {
			dispatch(setModalDelete({
				isOpen: true, 
				selected: {
					...productLanguage,
					id: product.id, 
					title: product.name || product.title,
					product_type: isMovie ? 'movie' : 'tv',
					experienceData: product.experienceData
				}
			}))
		}
	}

	if (isAlreadyOnTheList) {
		return (
			<ExperienceBox background={background}>
				<ExperienceHeader>
					<ExperienceHeaderTitle>
						{title.length > 0 ? (
							<>
								{title}
							</>
						) : (
							<FormattedMessage defaultMessage={"experienceSectionHeaderTitle"} id={"experienceSectionHeaderTitle"} />
						)}
					</ExperienceHeaderTitle>

					<ExperienceHeaderButton>
						<Button 
							backgroundColor={theme.colors.mainBrandColors.light}
							size={"icon"} 
							handleOnClick={() => handleOnClickDone()}
							iconPadding={"9px"}
						>
							<PencilAltIcon />
						</Button>
						<Button 
							backgroundColor={theme.colors.mainBrandColors.light}
							size={"icon"} 
							handleOnClick={() => handleOnOpenDeleteModal()}
							iconPadding={"9px"}
						>
							<TrashIcon />
						</Button>
						<Button 
							backgroundColor={theme.colors.mainBrandColors.light}
							size={"icon"}
							// onClick={() => Router.push(`/${product.title ? "movie" : "tv"}/${textToPath(product?.title || product?.name)}?id=${product?.id}`)} 
							handleOnClick={() => router.push(`/${product.title ? "movie" : "tv"}/${textToPath(product?.title || product?.name)}?id=${product?.id}`)}
							iconPadding={"9px"}
						>
							<ChevronRightIcon />
						</Button>
					</ExperienceHeaderButton>
				</ExperienceHeader>
				<ExperienceBody>
					{(experienceData?.date || experienceData?.place) && (
						<ExperienceBodyLeft>
							{experienceData?.date && (
								<ExperienceSection>
									<ExperienceSectionTitle>
										<FormattedMessage defaultMessage={"experienceDataDate"} id={"experienceDataDate"} />
									</ExperienceSectionTitle>
									<ExperienceSectionData>
										<Montserrat>
											{formatDate(experienceData?.date, userLanguageState)}
										</Montserrat>
									</ExperienceSectionData>
								</ExperienceSection>
							)}
							{experienceData?.place && (
								<ExperienceSection>
									<ExperienceSectionTitle>
										<FormattedMessage defaultMessage={"experienceDataPlace"} id={"experienceDataPlace"} />
									</ExperienceSectionTitle>
									<ExperienceSectionData>
										<EmojiIcon>
											<Emoji>
												{experienceData.place.emoji}
											</Emoji>
											<Montserrat type="small">
												{experienceData.place.label}
											</Montserrat>
										</EmojiIcon>
									</ExperienceSectionData>
								</ExperienceSection>
							)}
						</ExperienceBodyLeft>
					)}
					{(experienceData?.people || experienceData?.aperitif) && (
						<ExperienceBodyCenter>
							{experienceData?.people && (
								<ExperienceSection>
									<ExperienceSectionTitle>
										<FormattedMessage defaultMessage={"experienceDataPlaymate"} id={"experienceDataPlaymate"} />
									</ExperienceSectionTitle>
									<ExperienceSectionData>
										{experienceData.people === "alone" ? (
											<EmojiIcon>
												<Emoji>
													🧑‍💻
												</Emoji>
												<Montserrat type="small">
													<FormattedMessage defaultMessage={"experiencePlaceOptionPeopleAlone"} id={"experiencePlaceOptionPeopleAlone"} />
												</Montserrat>
											</EmojiIcon>
										) : (
											<>
												{experienceData.playmate.map(mate => (
													<PlaymateWrapper key={mate.id}>
														<EmojiIcon>
															<Emoji>
																{mate.emoji}
															</Emoji>
															<Montserrat type="small">
																{mate.mate}
															</Montserrat>
														</EmojiIcon>
													</PlaymateWrapper>
												))}
											</>
										)}
									</ExperienceSectionData>
								</ExperienceSection>
							)}
							{experienceData?.aperitif && (
								<ExperienceSection>
									<ExperienceSectionTitle>
										<FormattedMessage defaultMessage={"experienceDataAperitif"} id={"experienceDataAperitif"} />
									</ExperienceSectionTitle>
									<ExperienceSectionData>
										<AperitifWrapper>
										{experienceData.aperitif.map(ape => (
											<EmojiIcon key={ape.value}>
												<Emoji marginBottom={"8px"}>
													{ape.emoji}
												</Emoji>
											</EmojiIcon>
										))}
										</AperitifWrapper>
									</ExperienceSectionData>
								</ExperienceSection>
							)}
						</ExperienceBodyCenter>
					)}
					{experienceData?.emoji && (
						<ExperienceBodyRight>
							<ExperienceSection>
									<ExperienceSectionTitle>
										<FormattedMessage defaultMessage={"experienceDataEmoji"} id={"experienceDataEmoji"} />
									</ExperienceSectionTitle>
									<ExperienceSectionData>
										<Emoji size="80" fontSize="36">
											{experienceData.emoji}
										</Emoji>
									</ExperienceSectionData>
								</ExperienceSection>
						</ExperienceBodyRight>

					)}
				</ExperienceBody>
			</ExperienceBox>
		)
	} else {
		return (
			<ExperienceQuestion>
				<LeftContainer>
					<Montserrat type="medium">
						{situation === 'main' ? (
							<>
								<FormattedMessage defaultMessage={"experienceSectionTextQuestion"} id={"experienceSectionTextQuestion"} />{" "} 
								<Montserrat type="medium" htmlAttribute="span" configuration={{color: theme.colors.mainBrandColors.light}}> {product?.title || product.name}</Montserrat>?
							</>

						) : situation === "login" ? (
							<FormattedMessage defaultMessage={"experienceSectionTextDone"} id={"experienceSectionTextDone"} />
						) : (
							<FormattedMessage defaultMessage={"experienceSectionTextNotYet"} id={"experienceSectionTextNotYet"} />
						)}
					</Montserrat>
				</LeftContainer>
				

				<RightContainer>
					{situation === 'main' ? (
						<ActionContainer>
							<Button className="btn-left" backgroundColor={theme.colors.component.dark} text="experienceSectionActionNotYet" handleOnClick={() => handleOnClickNotYet()} />
							<Button active={true} backgroundColor={theme.colors.mainBrandColors.dark} text="experienceSectionActionDone" handleOnClick={() => handleOnClickDone()} />
						</ActionContainer>
					) : situation === 'login' ? (
						<ActionContainer>
							<FormattedMessage defaultMessage={"experienceSectionActionDoneNoLogin"} id={"experienceSectionActionDoneNoLogin"} />
						</ActionContainer>
					) : situation === 'addToWatch' ? (
						<ActionContainer>
							<FormattedMessage defaultMessage={"experienceSectionActionNotYetLogged"} id={"experienceSectionActionNotYetLogged"} />
							<ActionsProductButton product={product} size={"medium"} action="watch"/>
						</ActionContainer>
					) : situation === 'addToWatch-login' ? (
						<FormattedMessage defaultMessage={"experienceSectionActionNotYetLogin"} id={"experienceSectionActionNotYetLogin"} />
					) : (
						<FormattedMessage defaultMessage={"experienceSectionActionNotYetAlreadyInListToWatch"} id={"experienceSectionActionNotYetAlreadyInListToWatch"} />
					)
				}
				</RightContainer>
			</ExperienceQuestion>
		)
	}
};

Experience.defaultProps = {
	product: {},
	title: "",
	background: "",
	urlProduct: "",
}

export default Experience;