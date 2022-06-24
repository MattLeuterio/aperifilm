import { HeaderContainer, ActionWrapper, UserWrapper, UserImageWrapper, UserName, UserDropdown, SettingButton, LanguageWrapper, LanguageDropdown, ImageWrap, LDropSection, LDropTitle, SelectCtn } from "./style";
import { Button, Searchbar, Image, Icon, CustomSelect } from "../../atoms";
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { UserIcon, ChevronDownIcon, ChevronUpIcon, AdjustmentsIcon, TranslateIcon, BookOpenIcon } from '@heroicons/react/solid';
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setUserDataFromLogin, setUserLanguage, setUserTranslate } from "../../store/actions/userDataAction";
import theme from "../../theme";
import { FormattedMessage } from "react-intl";
import Montserrat from "../../typography/montserrat";
import Link from "next/link";
import { useRouter } from "next/router";
import Flagen from "../../assets/images/flag-en.webp";
import Flagit from "../../assets/images/flag-it.webp";
import { languageOption, countryTranslation } from "../../js";

const Header = ({}) => {
	const { user, error, isLoading } = useUser();
	const [userData, setUserData] = useState({});
	const [flag, setFlag] = useState(Flagen.src);
	const [userDropdownStatus, setUserDropdownStatus] = useState(false);
	const [languageDropdownStatus, setLanguageDropdownStatus] = useState(false);
	const [countryList, setCountryList] = useState([]);
	const [defaultValueSelectTranslate, setDefaultValueSelectTranslate] = useState({});
	const [defaultValueSelectLanguage, setDefaultValueSelectLanguage] = useState({});
  const dispatch = useDispatch();
	const router = useRouter();
	const userDataSelector = useSelector((state) => state.userData);
	const wrapperRefUserDropdown = useRef(null);
	const wrapperRefLanguageDropdown = useRef(null);

	useEffect(() => {
		const list = countryTranslation?.reduce((acc, obj) => {
			return [
				{
					value: obj.code, 
					label: obj.name,
				},
				...acc
			]
		}, []).reverse();

		setCountryList(list);
		
		const language = userData?.language?.length > 0 ? userData.language : router.locale;

		handleOnChangeLanguage(languageOption?.filter(el => el.value === language)[0])

		const langTranslate = userData?.translate?.lenght > 0 ? userData?.translate : userData?.language?.length > 0 ? userData.language : router.locale;
		handleOnChangeTranslate(list?.filter(el => el.value.substr(0, 2) === langTranslate)[0]);
	}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRefUserDropdown.current && !wrapperRefUserDropdown.current.contains(event.target)) {
        setUserDropdownStatus(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

	useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRefLanguageDropdown.current && !wrapperRefLanguageDropdown.current.contains(event.target)) {
        setLanguageDropdownStatus(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    dispatch(setUserDataFromLogin(user));
  }, [user]);

	useEffect(() => {
    setUserData(userDataSelector);
  }, [userDataSelector]);

	const handleOnClickUser = () => {
		setUserDropdownStatus(!userDropdownStatus);
	}

	const renderFlag = () => {
		const lang = userData?.language?.length > 0 ? userData.language : router.locale;
		if (lang === 'it') {
			return Flagit.src
		} else {
			return Flagen.src
		}
	}

	const handleOnChangeTranslate = (el) => {
		setDefaultValueSelectTranslate(el);
		dispatch(setUserTranslate(el?.value));
	}

	const handleOnChangeLanguage = (el) => {
		setDefaultValueSelectLanguage(el);
		dispatch(setUserLanguage(el?.value));
	}

	return (
		<HeaderContainer>
			<Searchbar />
			<ActionWrapper>
				{user ? (
					<UserWrapper>
						<UserImageWrapper
							onClick={() => handleOnClickUser()}
						>
							{userData.picture ? (
								<Image
									src={userData.picture} 
									width="32px"
									height="32px"
									layout="fixed" 
								/>
							) : (
								<Icon
									stroke="transparent"
									fill={theme.colors.element.dark}
								>
									<UserIcon />
								</Icon>
							)}
						</UserImageWrapper>
						<UserName
							onClick={() => handleOnClickUser()}
						>
							{userData.given_name}
						</UserName>
						<Icon
							stroke="transparent"
							fill={theme.colors.element.dark}
							width="22px"
							height="22px"
							handleOnClick={() => handleOnClickUser()}
						>
							{!userDropdownStatus ? (<ChevronDownIcon />) : (<ChevronUpIcon />)}
						</Icon>
						{userDropdownStatus && (
							<UserDropdown ref={wrapperRefUserDropdown}>
								<SettingButton>
									<Icon
										stroke="transparent"
										fill={theme.colors.element.dark}
										width="18px"
										height="17px"
									>
										<AdjustmentsIcon />
									</Icon>
									<Link href="/settings">
										<Montserrat type="settingButton">
											<FormattedMessage defaultMessage={"settingButtonSettings"} id={"settingButtonSettings"} />
										</Montserrat>
									</Link>
								</SettingButton>
								<SettingButton>
									<Icon
										stroke={theme.colors.element.dark}
										fill="transparent"
										width="18px"
										height="17px"
									>
										<LogoutIcon />
									</Icon>
									<Link href="/api/auth/logout">
										<Montserrat 
											type="settingButton" 
										>
											<FormattedMessage defaultMessage={"buttonLogout"} id={"buttonLogout"} />
										</Montserrat>
									</Link>
								</SettingButton>
							</UserDropdown>
						)}
					</UserWrapper>
				) : (
					<Button
						active
						url="/api/auth/login"
					>
						<LoginIcon />
					</Button>
				)}
				<LanguageWrapper>
					<ImageWrap
						onClick={() => setLanguageDropdownStatus(!languageDropdownStatus)}
					>
						<Image
							onClick={() => setLanguageDropdownStatus(!languageDropdownStatus)}
							src={renderFlag()} 
							width="25px"
							height="16px"
							layout="fixed" 
						/>
					</ImageWrap>
					{languageDropdownStatus && (
						<LanguageDropdown
							ref={wrapperRefLanguageDropdown}
						>
							<LDropSection>
								<LDropTitle>
									<Icon
										stroke="transparent"
										fill={theme.colors.element.dark}
										width="17px"
										height="17px"
										handleOnClick={() => handleOnClickUser()}
									>
										<TranslateIcon />
									</Icon>
									<Montserrat 
										type="settingButton"
										configuration={{ fontWeight: 600 }}
									>
										<FormattedMessage defaultMessage={"settingButtonTitleTranslate"} id={"settingButtonTitleTranslate"} />
									</Montserrat>
								</LDropTitle>
								<SelectCtn>
									<CustomSelect
										defaultValue={defaultValueSelectTranslate}
										isLoading={isLoading}
										onChange={(e) => handleOnChangeTranslate(e)}
										isSearchable
										name="color"
										options={countryList}
									/>
								</SelectCtn>
							</LDropSection>
							<LDropSection>
								<LDropTitle>
									<Icon
										stroke="transparent"
										fill={theme.colors.element.dark}
										width="17px"
										height="17px"
										handleOnClick={() => handleOnClickUser()}
									>
										<BookOpenIcon />
									</Icon>
									<Montserrat 
										type="settingButton"
										configuration={{ fontWeight: 600 }}
									>
										<FormattedMessage defaultMessage={"settingButtonTitleLanguage"} id={"settingButtonTitleLanguage"} />
									</Montserrat>
								</LDropTitle>
								<SelectCtn>
									<CustomSelect
										defaultValue={defaultValueSelectLanguage}
										isLoading={isLoading}
										onChange={(e) => handleOnChangeLanguage(e)}
										isSearchable
										name="color"
										options={languageOption}
									/>
								</SelectCtn>
							</LDropSection>
						</LanguageDropdown>
					)}
				</LanguageWrapper>
			</ActionWrapper>
		</HeaderContainer>
	)
};

export default Header;