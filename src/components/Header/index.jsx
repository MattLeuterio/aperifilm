/* eslint-disable react-hooks/exhaustive-deps */
import { HeaderContainer, ActionWrapper, UserWrapper, UserImageWrapper, UserName, UserDropdown, SettingButton, LanguageWrapper, LanguageDropdown, ImageWrap, LDropSection, LDropTitle, SelectCtn, SearchWrapper, MobileActionsWrapper, MenuWrapper, MenuSection, MenuSectionLinks, LinkWrapper } from "./style";
import { Button, Searchbar, Image, Icon, CustomSelect, ActiveLink } from "../../atoms";
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { UserIcon, ChevronDownIcon, ChevronUpIcon, AdjustmentsIcon, TranslateIcon, BookOpenIcon, MenuIcon, SearchIcon, XIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { setUserDataFromLogin, setUserLanguage, setUserProducts } from "../../store/actions/userDataAction";
import theme from "../../theme";
import { FormattedMessage } from "react-intl";
import Montserrat from "../../typography/montserrat";
import Link from "next/link";
import { useRouter } from "next/router";
import Flagen from "../../assets/images/flag-en.webp";
import Flagit from "../../assets/images/flag-it.webp";
import { languageOption } from "../../js";
import useMediaQuery from "../../hooks/useMediaQuery";
import LogoAperifilm from "../../assets/images/logo-aperifilm.svg";
import { infoRoutes, primaryRoutes, userRoutes } from "../../routes";
import { createUser, updateUser, getUser } from "../../../pages/api/auth/users";
import { loginPath, logoutPath } from "../../js/utility";

const Header = ({}) => {
	const { user, error, isLoading } = useUser();
  	const dispatch = useDispatch();
	const router = useRouter();

	const [userData, setUserData] = useState({});
	const [userListProducts, setUserListProducts] = useState([]);
	
	// User states Selectors
	const userDataSelector = useSelector((state) => state.userData);
	const userLanguageSelector = useSelector((state) => state.userData.language);
	
	// Menus Visibility
	const [visibilitySearchBar, setVisibilitySearchBar] = useState(false);
	const [visibilityMobileMenu, setVisibilityMobileMenu] = useState(false);

	// Dropdowns
	const [userDropdownStatus, setUserDropdownStatus] = useState(false);
	const [languageDropdownStatus, setLanguageDropdownStatus] = useState(false);
	const [defaultValueSelectLanguage, setDefaultValueSelectLanguage] = useState({});

	// Dropdown's wrappers
	const wrapperRefUserDropdown = useRef(null);
	const wrapperRefLanguageDropdown = useRef(null);

  	const isLaptop = useMediaQuery(1024);

	useEffect(() => {
		const language = userData?.language?.length > 0 ? userData.language : router.locale;
		handleOnChangeLanguage(languageOption?.filter(el => el.value === language)[0])
	}, [user]);

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
		if (user) {
			getUser(user?.email).then((res) => {
				if (Boolean(res.length)) {
					dispatch(setUserDataFromLogin(res[0]?.fields));
				} else {
					const listProducts = {
						favorite: [],
						vote: [],
						watch: [],
						experience: []
					}
					const body = {
						"sub": user?.sub,
						"given_name": user?.given_name,
						"family_name": user?.family_name,
						"nickname": user?.nickname,
						"picture": user?.picture,
						"locale": user?.locale,
						"updated_at": user?.updated_at,
						"email": user?.email,
						"list_products": JSON.stringify(listProducts)
					}
					createUser(body).then(res => {
						dispatch(setUserDataFromLogin(res?.fields))
					});
				}
			})
		}
	}, [user])

	useEffect(() => {
		setUserData(userDataSelector);
	}, [userDataSelector]);

	useEffect(() => {
		if (
			Object.keys(userData).length > 0 
			&& Boolean(userData?.list_products) 
			&& typeof userData?.list_products === 'string') 
		{
			const JSONproduct = JSON.parse(userData?.list_products);
			
			const listProducts = Object.keys(JSONproduct).length > 0 
			? JSONproduct
			: { favorite: [], watch: [], vote: [], experience: [] } 

			setUserListProducts(listProducts);
		}
  	}, [userData]);
	
	useEffect(() => {
		if (Object.keys(userListProducts).length > 0) {
			dispatch(setUserProducts(userListProducts));
		}
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

	const handleOnChangeLanguage = (el) => {
		setDefaultValueSelectLanguage(el);
		dispatch(setUserLanguage(el?.value));
		if (userData.record_id) {
			updateUser(userData.record_id, {"language": el?.value})
		}
	}

	useEffect(() => {
		setDefaultValueSelectLanguage(languageOption?.filter(el => el.value === userLanguageSelector));
	}, [userLanguageSelector])

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
					{user ? (
						<UserWrapper>
							<UserImageWrapper
								onClick={() => handleOnClickUser()}
							>
								{userData.picture ? (
									<Image
										className="user-image"
										alt={`${userData.given_name} picture`}
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
								{userData.nickname ? userData.nickname : userData.email}
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
										<Link href="/user/settings">
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
										<Link href={logoutPath}>
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
							handleOnClick={() => handleOnClickLoginButton(loginPath)}
							text="buttonLogin"
							className="login-button"
							active
							url={loginPath}
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
								alt="language flag"
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
								<LinkWrapper key={index} onClick={() => setVisibilityMobileMenu(false)}>
									<ActiveLink activeClassName="active" href={route.to}>
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
								<LinkWrapper key={index} onClick={() => setVisibilityMobileMenu(false)}>
									<ActiveLink activeClassName="active" href={route.to}>
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
								<LinkWrapper key={index} onClick={() => setVisibilityMobileMenu(false)}>
									<ActiveLink activeClassName="active" href={route.to}>
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