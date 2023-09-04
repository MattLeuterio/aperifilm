import theme from '../../../theme';
import { ModalContainer, BackgroundOpacity, Header, Body, Left, PreviewContainer, ButtonsContainer, Right, LayoutContainer, SettingsContainer, SettingLeft, Setting, SettingRight, Preview, Svg} from './style';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon } from '../../../atoms';
import { useRouter } from 'next/router';
import Montserrat from '../../../typography/montserrat';
import { useDispatch, useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/solid';
import { setModalStories } from '../../../store/actions/appAction';
import useMediaQuery from '../../../hooks/useMediaQuery';
import LayoutWave1 from '../../../assets/images/stories/story-layout-wave-1.svg';
import LayoutWave2 from '../../../assets/images/stories/story-layout-wave-2.svg';
import LayoutWave3 from '../../../assets/images/stories/story-layout-wave-3.svg';
import LayoutWave4 from '../../../assets/images/stories/story-layout-wave-4.svg';
import LogoAperifilmRed from '../../../assets/images/logo-aperifilm.svg';
import Image from 'next/image';

const COLORS_STORY = {
	blue: '#252333',
	red: '#A30717',
	white: '#ffffff',
}

const LayoutWaveOptions = {
	LayoutWave1: {
		width: "223",
		height: "400",
		viewBox: "0 0 1023 1291",
		pathD: "M0.90372 803.458C0.90372 803.458 -19.9909 585.697 177.261 446.043C374.513 306.39 879.952 343.187 1022.6 0.484863V642.911V1291H0.903698L0.90372 803.458Z"
	}
}

const defaultSettingStories = {
	layoutSelected: 1,
	wave: LayoutWave1,
	waveOptions: LayoutWaveOptions.LayoutWave1,
	visibility: {
		title: true,
		poster: true,
		vote: true,
		bottles: true
	},
	colors: {
		background: COLORS_STORY.blue,
		wave: COLORS_STORY.red,
		logo: LogoAperifilmRed.src,
		text: COLORS_STORY.white
	},
	position: {
		url: 'bottom',
		logo: 'top',
		vote: 'center',
		bottles: 'bottom'
	}
}

const ModalStories = ({
}) => {
	const isTablet = useMediaQuery(769);
	const router = useRouter();
	const dispatch = useDispatch();

	const [step, setStep] = useState(1);
	const [settings, setSettings] = useState(defaultSettingStories);
	
	const modalStateIsOpen = useSelector((state) => state.app.modalStories?.isOpen);
	const modalStateSelected = useSelector((state) => state.app.modalStories?.selected);

	useEffect(() => {

	}, [settings])
	
	const handleOnClose = () => {
		dispatch(setModalStories({isOpen: false, selected: {}}));
	}

	console.log('settings', settings)
	console.log('wave', LayoutWave1)

	return (
		<>
			{modalStateIsOpen && (
				<>
					<BackgroundOpacity onClick={(e) => handleOnClose(e)}></BackgroundOpacity>
					<ModalContainer
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
										fontSize: isTablet ? 24 : 28, 
										fontWeight: 600, 
										color: theme.colors.element.light,
										textAlign: "center",
									}
								}
							>
								<FormattedMessage defaultMessage={"createInstagramStories"} id={"createInstagramStories"} />
							</Montserrat>
							<Montserrat 
								className={"modal-subtitle"} 
								configuration={
									{
										fontSize: isTablet ? 14 : 16,
										lineHeight: "20px", 
										color: theme.colors.element.light,
										textAlign: "center",
									}
								}
							>
								<FormattedMessage defaultMessage={"modalStoriesSubtitle"} id={"modalStoriesSubtitle"} />
							</Montserrat>
						</Header>

						<Body>
							{step === 1 && (
								<>
									<Left>
										<PreviewContainer>
											<Preview
												settings={settings}
											>
												<svg
													className={`svg-preview layout-${settings.layoutSelected}`}
													width={settings.waveOptions.width}
													height={settings.waveOptions.height}
													viewBox={settings.waveOptions.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
												>
													<path 
														d={settings.waveOptions.pathD}
														fill={settings.colors.wave}
													/>
												</svg>
											</Preview>
										</PreviewContainer>
										<ButtonsContainer>

										</ButtonsContainer>
									</Left>
									<Right>
										<LayoutContainer>

										</LayoutContainer>
										<SettingsContainer>
											<SettingLeft>
												<Setting>
													<Montserrat 
														className={""} 
														configuration={
															{
																fontSize: isTablet ? 14 : 16,
																lineHeight: "20px", 
																color: theme.colors.element.light,
																textAlign: "center",
															}
														}
													>
														<FormattedMessage defaultMessage={"modalSettingLayout"} id={"modalSettingLayout"} />
													</Montserrat>
												</Setting>
												<Setting></Setting>
											</SettingLeft>
											<SettingRight>
												<Setting></Setting>
											</SettingRight>
										</SettingsContainer>
									</Right>
								</>
							)}
						</Body>

					</ModalContainer>
				</>
			)}
		</>
	)
};


ModalStories.defaultProps = {
}

export default ModalStories;