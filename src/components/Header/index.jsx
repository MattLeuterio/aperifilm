import { HeaderContainer, ActionWrapper, UserWrapper, UserImageWrapper, UserName, UserDropdown, SettingButton, LanguageWrapper, LanguageDropdown, ImageWrap, LDropSection, LDropTitle, SelectCtn, SearchWrapper, MobileActionsWrapper, MenuWrapper, MenuSection, MenuSectionLinks, LinkWrapper } from "./style";
import { Button, Searchbar, Image, Icon, CustomSelect, ActiveLink } from "../../atoms";
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { UserIcon, ChevronDownIcon, ChevronUpIcon, AdjustmentsIcon, TranslateIcon, BookOpenIcon, MenuIcon, SearchIcon, XIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { setUserDataFromLogin, setUserLanguage, setUserProducts, setUserTranslate } from "../../store/actions/userDataAction";
import theme from "../../theme";
import { FormattedMessage } from "react-intl";
import Montserrat from "../../typography/montserrat";
import Link from "next/link";
import { useRouter } from "next/router";
import Flagen from "../../assets/images/flag-en.webp";
import Flagit from "../../assets/images/flag-it.webp";
import { languageOption, countryTranslation } from "../../js";
import useMediaQuery from "../../hooks/useMediaQuery";
import LogoAperifilm from "../../assets/images/logo-aperifilm.svg";
import { infoRoutes, primaryRoutes, userRoutes } from "../../routes";
import { createUser, updateUser } from "../../../pages/api/auth/users";
import { getUsersList } from "../../store/actions/userAction";

const Header = ({}) => {
	const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
	const router = useRouter();

	const [userData, setUserData] = useState({});
	const [usersList, setUsersList] = useState(null);
	const [userListProducts, setUserListProducts] = useState([]);
	const [userDropdownStatus, setUserDropdownStatus] = useState(false);
	const [languageDropdownStatus, setLanguageDropdownStatus] = useState(false);
	const [countryList, setCountryList] = useState([]);
	// const [defaultValueSelectTranslate, setDefaultValueSelectTranslate] = useState({});
	const [visibilitySearchBar, setVisibilitySearchBar] = useState(false);
	const [visibilityMobileMenu, setVisibilityMobileMenu] = useState(false);
	const [defaultValueSelectLanguage, setDefaultValueSelectLanguage] = useState({});
	
	const userDataSelector = useSelector((state) => state.userData);
	const userListSelector = useSelector((state) => state.usersList.list);

	const wrapperRefUserDropdown = useRef(null);
	const wrapperRefLanguageDropdown = useRef(null);

  const isLaptop = useMediaQuery(1024);

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

		const langTranslate = Boolean(userData?.translate) 
		? userData?.translate 
			: Boolean(userData?.language)
		? userData.language === 'en' ? 'en-US' : 'it-IT'
			: router.locale;
		// handleOnChangeTranslate(list?.filter(el => el.value === langTranslate)[0]);
	}, [usersList]);

	useEffect(() => {
		dispatch(getUsersList());
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
		if(usersList && user) {
			const userLogged = usersList.filter(u => u.fields.sub === user?.sub)[0];

			if (Boolean(userLogged)) {
				dispatch(setUserDataFromLogin({...userLogged.fields}));
			}
			
		}
  }, [usersList]);

	useEffect(() => {
		if (usersList && user) {
			const exist = usersList.filter(u => u.fields.sub === user?.sub).length > 0;

			if (!exist) {
				const body = {
					"sub": user?.sub,
					"given_name": user?.given_name,
					"family_name": user?.family_name,
					"nickname": user?.nickname,
					"picture": user?.picture,
					"locale": user?.locale,
					"updated_at": user?.updated_at,
					"email": user?.email,
				}
				createUser(body);
			}
		}
	}, [usersList])

 

	useEffect(() => {
    setUserData(userDataSelector);
  }, [userDataSelector]);

	useEffect(() => {
    setUsersList(userListSelector);
  }, [userListSelector]);

	useEffect(() => {
		if (
					Object.keys(userData).length > 0 
					&& Boolean(userData?.list_products) 
					&& typeof userData?.list_products === 'string') 
		{
			const listProducts = JSON.parse(userData?.list_products);
			setUserListProducts(listProducts);
		}
  }, [userData]);
	
	useEffect(() => {
		if (Object.keys(userListProducts).length > 0) {
			dispatch(setUserProducts(userListProducts));
		}
  }, [userListProducts]);



	useEffect(() => {
		// if (userData.list_products) {
		// 	const json = JSON.parse(usersList[0].fields.list_products).voted;
		// 	console.log(json);
		// 	json.push({id: '12132132', title: 'new'})
		// 	console.log(json);
		// 	console.log(JSON.stringify(json));
		// }
  }, [userListProducts]);


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

	// const handleOnChangeTranslate = (el) => {
	// 	setDefaultValueSelectTranslate(el);
	// 	dispatch(setUserTranslate(el?.value));
	// 	if (userData.record_id) {
	// 		updateUser(userData.record_id, {"translate": el?.value})
	// 	}
	// }

	const handleOnChangeLanguage = (el) => {
		setDefaultValueSelectLanguage(el);
		dispatch(setUserLanguage(el?.value));
		if (userData.record_id) {
			updateUser(userData.record_id, {"language": el?.value})
		}
	}

	const handleOnClickLoginButton = (url) => {
		router.push(url);
	}

	const handleOnClickSearchIcon = () => {
		setVisibilitySearchBar(!visibilitySearchBar);
		setVisibilityMobileMenu(false);
	}

	const handleOnClickMenuIcon = () => {
		setVisibilityMobileMenu(!visibilityMobileMenu);
		setVisibilitySearchBar(false);
	}
	

	return (
		<>
			<HeaderContainer>
				<Image
					onClick={() => router.push('/')}
					className="logo-website" 
					src={LogoAperifilm.src}
					alt="aperifilm.com logo" 
					width="159px"
					layout="fixed" 
				/>
				{isLaptop && (
					<MobileActionsWrapper>
						<Icon
							handleOnClick={() => handleOnClickMenuIcon()}
							stroke="transparent"
							fill={theme.colors.element.light}
							width="25px"
							height="25px"
						>
							{visibilityMobileMenu ? (
								<XIcon />
							): (
								<MenuIcon />
							)}
						</Icon>
						<Icon
							handleOnClick={() => handleOnClickSearchIcon()}
							stroke="transparent"
							fill={theme.colors.element.dark}
							width="23px"
							height="23px"
						>
							{visibilitySearchBar ? (
								<XIcon />
							): (
								<SearchIcon />
							)}
						</Icon>
					</MobileActionsWrapper>
				)}
				<SearchWrapper isVisible={visibilitySearchBar}>
					<Searchbar />
				</SearchWrapper>
				<ActionWrapper>
					{/* {user ? (
						<UserWrapper>
							<UserImageWrapper
								onClick={() => handleOnClickUser()}
							>
								{userData.picture ? (
									<Image
										className="user-image"
										src={userData.picture} 
										width="30px"
										height="30px"
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
								{userData.given_name ? userData.given_name : userData.nickname }
							</UserName>
							<Icon
								className="icn-arrow-user"
								stroke="transparent"
								fill={theme.colors.element.dark}
								width="22px"
								height="22px"
								handleOnClick={() => handleOnClickUser()}
							>
								{!userDropdownStatus ? (<ChevronDownIcon />) : (<ChevronUpIcon />)}
							</Icon>
							{userDropdownStatus && (
								<UserDropdown isVisible={userDropdownStatus} ref={wrapperRefUserDropdown}>
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
							handleOnClick={() => handleOnClickLoginButton('/api/auth/login')}
							className="login-button"
							active
							url="/api/auth/login"
						>
							<LoginIcon />
						</Button>
					)} */}
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
								{/* <LDropSection>
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
								</LDropSection> */}
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
			
			{isLaptop && (
				<MenuWrapper isVisible={visibilityMobileMenu}>
					<MenuSection>
						<MenuSectionLinks>
							{primaryRoutes?.map((route, index) => (
								<LinkWrapper onClick={() => setVisibilityMobileMenu(false)}>
									<ActiveLink key={index} activeClassName="active" href={route.to}>
										<div className="link">
											<Icon
												className="icn-page"
												stroke="transparent"
												fill={theme.colors.element.dark}
											>
												{route.icon}
											</Icon>
											<a className="nav-link">
												<FormattedMessage defaultMessage={route.title} id={route.title} />
											</a>
											<Icon
												className="icn-arrow"
												stroke="transparent"
												fill={theme.colors.element.dark}
											>
												<ChevronRightIcon />
											</Icon>
										</div>
									</ActiveLink>		
								</LinkWrapper>
							))}
						</MenuSectionLinks>
						<Montserrat type="sidebarMenuSectionTitle">
							<FormattedMessage defaultMessage={"sidebarYourListTitle"} id={"sidebarYourListTitle"} />
						</Montserrat>
						<MenuSectionLinks>
							{userRoutes?.map((route, index) => (
								<LinkWrapper onClick={() => setVisibilityMobileMenu(false)}>
									<ActiveLink key={index} activeClassName="active" href={route.to}>
										<div className="link">
											<Icon
												className="icn-page"
												stroke="transparent"
												fill={theme.colors.element.dark}
											>
												{route.icon}
											</Icon>
											<a className="nav-link">
												<FormattedMessage defaultMessage={route.title} id={route.title} />
											</a>
											<Icon
												className="icn-arrow"
												stroke="transparent"
												fill={theme.colors.element.dark}
											>
												<ChevronRightIcon />
											</Icon>
										</div>
									</ActiveLink>
								</LinkWrapper>
							))}
						</MenuSectionLinks>
						<MenuSectionLinks>
							{infoRoutes?.map((route, index) => (
								<LinkWrapper onClick={() => setVisibilityMobileMenu(false)}>
									<ActiveLink key={index} activeClassName="active" href={route.to}>
										<div className="link">
											<Icon
												className="icn-page"
												stroke="transparent"
												fill={theme.colors.element.dark}
											>
												{route.icon}
											</Icon>
											<a className="nav-link">
												<FormattedMessage defaultMessage={route.title} id={route.title} />
											</a>
											<Icon
												className="icn-arrow"
												stroke="transparent"
												fill={theme.colors.element.dark}
											>
												<ChevronRightIcon />
											</Icon>
										</div>
									</ActiveLink>
								</LinkWrapper>
							))}
						</MenuSectionLinks>
					</MenuSection>
				</MenuWrapper>
			)}
		</>
	)
};

export default Header;