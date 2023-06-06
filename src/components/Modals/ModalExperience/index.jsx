import theme from '../../../theme';
import { VotePanelContainer, ButtonsContainer, Button, BackgroundOpacity, Header, Body, Footer, Question, Explanation, HeaderQuestion, DatePickerWrapper, ErrorWrapper, EmojiIconContainer, Emoji, EmojiIcon, PlaymateContainer, Input, AddWrapper, SelectContainer, ListPlaymateWrapper, PlaymateElement, EmojiPlaymate, Mate, PlaceEmojiIconContainer, PlaceEmojiIcon, EndTitle, CurrentDate } from './style';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { CustomSelect, Icon } from '../../../atoms';
import { useRouter } from 'next/router';
import Montserrat from '../../../typography/montserrat';
import { useDispatch, useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/solid';
import { setModalExperience } from '../../../store/actions/appAction';
import useMediaQuery from '../../../hooks/useMediaQuery';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MinusCircleIcon, PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { updateUser } from '../../../../pages/api/auth/users';
import { setUserProducts } from '../../../store/actions/userDataAction';
import { aperitifOptions, defaultExperience, emojiOptions, experienceSteps, placeOptions, playmateEmojiOptions } from '../../../js/experience';
const { v4: uuidv4 } = require('uuid');
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import it from 'date-fns/locale/it';
import { formatDate } from '../../../js/utility';
registerLocale('it', it)

const ModalExperience = ({
}) => {
	const isTablet = useMediaQuery(769);
	const router = useRouter();
	const dispatch = useDispatch();
	const [type, setType] = useState("");
	const userLanguageState = useSelector((state) => state.userData.language);
	const modalStateIsOpen = useSelector((state) => state.app.modalExperience?.isOpen);
	const experienceStateSelected = useSelector((state) => state.app.modalExperience?.selected);
	const userDataListProductsRedux = useSelector((state) => state.userData.list_products);
	const experienceListProductsRedux = useSelector((state) => state.userData?.list_products[0]?.lists?.experience);
	const userData = useSelector((state) => state.userData)

	const [experienceData, setExperienceData] = useState(defaultExperience);
	const [actualStep, setActualStep] = useState("date");
	const [error, setError] = useState("");

	// Playmate
	const [currentPlaymate, setCurrentPlaymate] = useState({emoji: playmateEmojiOptions[0].value, mate: ""});
	const [playmateList, setPlaymateList] = useState([]);

	// Aperitif
	const [aperitifList, setAperitifList] = useState([]);

	// Date
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		
		const selected = experienceListProductsRedux?.filter(el => el.id === experienceStateSelected.id);
		if (selected?.length > 0) setExperienceData(selected[0].experience)
		else setExperienceData(defaultExperience);
		if (selected && selected[0]?.experience.playmate?.length > 0) setPlaymateList(selected[0].experience.playmate)
		if (selected && selected[0]?.experience.aperitif?.length > 0) setAperitifList(selected[0].experience.aperitif)	
		setType(experienceStateSelected.product_type)
		if (selected && selected[0]?.experience?.date) setCurrentDate(selected[0]?.experience?.date)

	}, [experienceListProductsRedux, experienceStateSelected.id, experienceStateSelected.product_type, modalStateIsOpen])

	const handleOnSkipStep = () => {
		if(actualStep === "aperitif") setAperitifList([]);
		setExperienceData({...experienceData, [actualStep]: undefined});
		setActualStep(experienceSteps[actualStep]?.next);
		setError("");

	}

	const handleOnContinue = () => {
		if (actualStep === "date") setExperienceData({...experienceData, date: currentDate});
		setActualStep(experienceSteps[actualStep]?.next);
	}

	const handleOnBack = () => {
		if(error?.length > 0) setExperienceData({...experienceData, [actualStep]: undefined});

		if (actualStep === "emoji" && !experienceData?.playmate) {
			setPlaymateList([]);
			setExperienceData({...experienceData, people: undefined});
			setCurrentPlaymate({emoji: playmateEmojiOptions[0].value, mate: ""});
			setActualStep("people")
		} else if (actualStep === "playmate" && !experienceData?.playmate) {
			setExperienceData({...experienceData, people: undefined});
			setActualStep("people");
		} else {
			setActualStep(experienceSteps[actualStep]?.prev);
		};
		setError("");
	}

	const handleOnClose = () => {
		dispatch(setModalExperience({isOpen: false, selected: []}));
		//setExperienceData(defaultExperience);
		setActualStep("date");
		setPlaymateList([]);
		setAperitifList([]);
	}
	

	// PLAYMATE
	const handleOnChangePlaymateEmoji = (el) => {
		setCurrentPlaymate({...currentPlaymate, emoji: el.value});
	}
	const handleOnClickAddMate = () => {
		if(
			currentPlaymate.emoji.length > 0
			&& currentPlaymate.mate.length > 2
		) {
			setPlaymateList([
				...playmateList,
				{
					id: uuidv4(),
					...currentPlaymate}
			])
			setCurrentPlaymate({emoji: playmateEmojiOptions[0].value, mate: ""})
		}
	};
	const handleOnClickRemoveMate = (playmate) => {
		const newPlaymateList = playmateList.filter(mate => mate.id !== playmate.id);
		setPlaymateList(newPlaymateList);
	};
	const handleOnChangePlaymateMate = (e) => {
		if(e.target.value.length < 3) {
			setError('nameMateMinLength');
		} else {
			setError("")
		}
		setCurrentPlaymate({...currentPlaymate, mate: e.target.value})
	}
	useEffect(() => {
		if (playmateList.length > 0) {
			setExperienceData({...experienceData, playmate: playmateList})
		} else {
			setExperienceData({...experienceData, playmate: undefined, people: undefined})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playmateList]);

	// Aperitif
	const handleOnAddAperitif = (food) => {
		const alreadyAdded = aperitifList.filter(el => el.value === food.value).length > 0;
		if (alreadyAdded) setAperitifList(aperitifList.filter(el => el.value !== food.value))
		else setAperitifList([...aperitifList, food]);
	}
	useEffect(() => {
		if (aperitifList.length > 0) {
			setExperienceData({...experienceData, aperitif: aperitifList})
		} else {
			setExperienceData({...experienceData, aperitif: undefined})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [aperitifList]);

	const checkDisable = () => {
		if (error?.length > 0 && (actualStep === "date" && !experienceData["date"])) {
			return undefined;
		} 

		if (experienceData[actualStep]) {
			return experienceData[actualStep]
		}

		if (actualStep === "date") {
			return true;
		}

		return undefined;
	}

	const handleOnSaveExperience = () => {
		const elementAlreadyInList = userDataListProductsRedux[0]?.lists?.experience?.filter(el => el.id === experienceStateSelected.id).length > 0;


		if (experienceStateSelected.en && experienceStateSelected.it) {
			if (!elementAlreadyInList) {
				const json = {
					...userDataListProductsRedux[0]?.lists,
					"experience": [
						...userDataListProductsRedux[0]?.lists.experience,
						{ 
							en: experienceStateSelected.en,
							it: experienceStateSelected.it,
							id: experienceStateSelected.id, 
							title: experienceStateSelected.title || experienceStateSelected.name, 
							product_type: experienceStateSelected.product_type,
							experience: experienceData
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
				updateUser(userData.record_id, body);
				dispatch(setUserProducts(json));
			} else {
				const updateProduct = userData.list_products[0].lists.experience.filter(el => el.id === experienceStateSelected.id);
				const listWithoutUpdatedProduct = userData.list_products[0].lists.experience.filter(el => el.id !== experienceStateSelected.id);
				
				const newExperienceDataList = [
					...listWithoutUpdatedProduct,
					{
						en: experienceStateSelected.en,
						it: experienceStateSelected.it,
						id: updateProduct[0].id,
						title: updateProduct[0].title,
						product_type: updateProduct[0].product_type,
						experience: experienceData
					}
				]
				
				const json = {
					...userDataListProductsRedux[0].lists,
					"experience": newExperienceDataList
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
				updateUser(userData.record_id, body);
				dispatch(setUserProducts(json));
			}
	
			handleOnClose();
		}

	}

	return (
		<>
			{modalStateIsOpen && (
				<>
					<BackgroundOpacity onClick={() => handleOnClose()}></BackgroundOpacity>
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
								{experienceStateSelected?.title}
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
								<FormattedMessage defaultMessage={"experienceModalSubtitle"} id={"experienceModalSubtitle"} />
							</Montserrat>
						</Header>

						<Body>
							<HeaderQuestion>
								<Question>
									<Montserrat type="modalExperienceQuestion">
										<FormattedMessage defaultMessage={experienceSteps[actualStep]?.question} id={experienceSteps[actualStep]?.question} />
									</Montserrat>
								</Question>

								{experienceSteps[actualStep]?.explanation && (
									<Explanation>
										<Montserrat type="modalExperienceExplanation">
											<FormattedMessage defaultMessage={experienceSteps[actualStep]?.explanation} id={experienceSteps[actualStep]?.explanation} />
										</Montserrat>
									</Explanation>
								)}
							</HeaderQuestion>

							{/* DATE */}
							{actualStep === "date" && (
								<DatePickerWrapper>
									<DatePicker 
										locale={userLanguageState}
										className='modal-experience-date-picker'
										dateFormat={userLanguageState === 'it' ? "dd/MM/yyyy" : "MM/dd/yyyy" }
										selected={new Date(currentDate)} 
										onChange={(date) => setCurrentDate(new Date(date).toISOString())} 
										minDate={new Date(experienceStateSelected.en.release_date)}
										maxDate={new Date()}
									/>
								</DatePickerWrapper> 
							)}

							{/* PLACE */}
							{actualStep === "place" && (
								<PlaceEmojiIconContainer>
									{type === "tv" ?(
										<>
											{placeOptions.filter(el => el.type === "tv").map(place => (
												<EmojiIcon 
													key={place.value}
													selected={place.value === experienceData?.place?.value}
												>
													<Emoji 
														onClick={() => setExperienceData({...experienceData, place: place})}
													>
														{place.emoji}
													</Emoji>
													<Montserrat type="small" configuration={{fontWeight: 600, textAlign: "center"}}>
														{place.label}
													</Montserrat>
												</EmojiIcon>
											))}
										</>
									) : (
										<>
											{placeOptions.map(place => (
												<EmojiIcon 
													key={place.value}
													selected={place.value === experienceData?.place?.value}
												>
													<Emoji 
														onClick={() => setExperienceData({...experienceData, place: place})}
													>
														{place.emoji}
													</Emoji>
													<Montserrat type="small" configuration={{fontWeight: 600, textAlign: "center"}}>
														{place.label}
													</Montserrat>
												</EmojiIcon>
											))}
										</>
									)}
								</PlaceEmojiIconContainer>
							)}

							{/* PEOPLE */}
							{actualStep === "people" && (
								<PlaceEmojiIconContainer>
									<PlaceEmojiIcon 
										selected={"alone" === experienceData?.people}
									>
										<Emoji 
											onClick={() => {
												setExperienceData({...experienceData, people: "alone"})
											}}
										>
											🧑‍💻
										</Emoji>
										<Montserrat type="small" configuration={{fontWeight: 600, textAlign: "center"}}>
											<FormattedMessage defaultMessage={"experiencePlaceOptionPeopleAlone"} id={"experiencePlaceOptionPeopleAlone"} />
										</Montserrat>
									</PlaceEmojiIcon>
									<PlaceEmojiIcon 
										selected={"playmate" === experienceData?.people}
									>
										<Emoji 
											onClick={
												() => {
													setExperienceData({...experienceData, people: "playmate"})
													setActualStep("playmate")
												}
											}
										>
											👬
										</Emoji>
										<Montserrat type="small" configuration={{fontWeight: 600, textAlign: "center"}}>
											<FormattedMessage defaultMessage={"experiencePlaceOptionPeopleMate"} id={"experiencePlaceOptionPeopleMate"} />
										</Montserrat>
									</PlaceEmojiIcon>
								</PlaceEmojiIconContainer>
							)}

							{/* PLAYMATE */}
							{actualStep === "playmate" && (
								<PlaymateContainer>
									<AddWrapper>
										<SelectContainer>
											<CustomSelect
												className="select-emoji"
												defaultValue={playmateEmojiOptions[0]}
												onChange={(e) => handleOnChangePlaymateEmoji(e)}
												isSearchable
												name="color"
												options={playmateEmojiOptions}
											/>
										</SelectContainer>
										<Input 
											placeholder={"Inserisci"}
											maxLength={25}
											value={currentPlaymate?.mate} 
											onChange={(e) => handleOnChangePlaymateMate(e)}
										/>
										<Icon
											handleOnClick={() => handleOnClickAddMate()}
											className="icon-add" 
											stroke={theme.colors.primary.white}
											width="25px"
											height="25px"
											disable={error}
										>
											<PlusCircleIcon/>
										</Icon>
									</AddWrapper>
									{playmateList.length > 0 && (
										<ListPlaymateWrapper>
											{playmateList.map((playmate, index) => (
												<PlaymateElement key={index}>
													<EmojiPlaymate>
														{playmate.emoji}
													</EmojiPlaymate>
													<Mate key={index}>
														{playmate.mate}
													</Mate>
													<Icon
														handleOnClick={() => handleOnClickRemoveMate(playmate)}
														className="icon-remove" 
														stroke={theme.colors.primary.white}
														width="25px"
														height="25px"
														disable={currentPlaymate.emoji.length <= 0 && currentPlaymate.mate.length < 2}
													>
														<MinusCircleIcon/>
													</Icon>
												</PlaymateElement>
											))}
										</ListPlaymateWrapper>
									)}
								</PlaymateContainer>
							)}

							{/* EMOJI */}
							{actualStep === "emoji" && (
								<EmojiIconContainer>
									{emojiOptions.map(emoji => (
										<EmojiIcon 
											key={emoji.value}
											selected={emoji.emoji === experienceData?.emoji}
										>
											<Emoji
												style={{marginBottom: 0}} 
												onClick={() => setExperienceData({...experienceData, emoji: emoji.emoji})}
											>
												{emoji.emoji}
											</Emoji>
										</EmojiIcon>
									))}
								</EmojiIconContainer>
							)}

							{/* APERITIF */}
							{actualStep === "aperitif" && (
								<EmojiIconContainer>
									{aperitifOptions.map(food => (
										<EmojiIcon 
											key={food.value}
											selected={aperitifList.filter(el => el.value === food.value).length > 0}
										>
											<Emoji
												style={{marginBottom: 0}} 
												onClick={() => handleOnAddAperitif(food)}
											>
												{food.emoji}
											</Emoji>
										</EmojiIcon>
									))}
								</EmojiIconContainer>
							)}

							{/* END */}
							{actualStep === "end" && (
								<>
									<EndTitle>
										<Montserrat type="medium" configuration={{ fontSize: 24 }}>
											<FormattedMessage defaultMessage={"experienceEndTitle"} id={"experienceEndTitle"} />
										</Montserrat>

									</EndTitle>
									<Montserrat type="small" configuration={{color: theme.colors.element.dark}}>
										<FormattedMessage defaultMessage={"experienceEndSubtitle"} id={"experienceEndSubtitle"} />
									</Montserrat>
								</>
							)}


						</Body>

						<Footer>
							<ButtonsContainer>
								{actualStep !== "end" ? (
									<>
										<Button
											className='vote-btn cancel'
											onClick={() => handleOnBack()}
											disable={experienceSteps[actualStep]?.prev ? experienceSteps[actualStep]?.prev : undefined}
										>
											<Montserrat>
												<FormattedMessage defaultMessage={"experienceModalActionBack"} id={"experienceModalActionBack"} />
											</Montserrat>
										</Button>
										{actualStep !== 'playmate' && (
											<Button
												className='vote-btn skip'
												onClick={() => handleOnSkipStep()}
												disable={false}
											>
												<Montserrat>
													<FormattedMessage defaultMessage={"experienceModalActionSkip"} id={"experienceModalActionSkip"} />
												</Montserrat>
											</Button>
										)}
										<Button
											className='vote-btn confirm'
											onClick={() => handleOnContinue()}
											disable={checkDisable()}
										>
											<Montserrat>
												<FormattedMessage defaultMessage={"experienceModalActionContinue"} id={"experienceModalActionContinue"} />
											</Montserrat>
										</Button>
									</>
								) : (
									<>
										<Button
											className='vote-btn cancel'
											onClick={() => handleOnBack()}
											disable={!experienceData[actualStep]?.prev}
										>
											<Montserrat>
												<FormattedMessage defaultMessage={"experienceModalActionBack"} id={"experienceModalActionBack"} />
											</Montserrat>
										</Button>
										<Button
											className='vote-btn skip'
											onClick={() => handleOnClose()}
											disable={false}
										>
											<Montserrat>
												<FormattedMessage defaultMessage={"voteModalButtonCancel"} id={"voteModalButtonCancel"} />
											</Montserrat>
										</Button>
										<Button
											className='vote-btn confirm'
											onClick={() => handleOnSaveExperience()}
											disable={false}
										>
											<Montserrat>
												<FormattedMessage defaultMessage={"settingsLabelButtonSave"} id={"settingsLabelButtonSave"} />
											</Montserrat>
										</Button>
									</>
								)}
							</ButtonsContainer>
						</Footer>
					</VotePanelContainer>
				</>
			)}
		</>
	)
};


ModalExperience.defaultProps = {
}

export default ModalExperience;

{/* VOTE */}
{/* {actualStep === "vote" && (
	<>
		<VoteBottlesContainer>
			<VoteBottleContainer>
				<VoteBottle voteRange={experienceData?.vote === undefined ||  experienceData?.vote === 0} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 0.5 && experienceData?.vote < 1} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 1} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

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

			<VoteBottleContainer>
				<VoteBottle voteRange={experienceData?.vote === undefined || experienceData?.vote <= 1} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 1.5 && experienceData?.vote < 2} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 2} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

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

			<VoteBottleContainer>
				<VoteBottle voteRange={experienceData?.vote === undefined || experienceData?.vote <= 2} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 2.5 && experienceData?.vote < 3} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 3} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

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

			<VoteBottleContainer>
				<VoteBottle voteRange={experienceData?.vote === undefined || experienceData?.vote <= 3} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 3.5 && experienceData?.vote < 4} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 4} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

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

			<VoteBottleContainer>
				<VoteBottle voteRange={experienceData?.vote === undefined || experienceData?.vote <= 4} className='vote-bottle full' urlSrc={FullBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 4.5 && experienceData?.vote < 5} className='vote-bottle half' urlSrc={HalfBottle.src}></VoteBottle>
				<VoteBottle voteRange={experienceData?.vote >= 5} className='vote-bottle empty' urlSrc={EmptyBottle.src}></VoteBottle>

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
	</>
)} */}