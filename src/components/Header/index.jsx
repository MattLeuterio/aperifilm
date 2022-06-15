import { HeaderContainer, ActionWrapper, UserWrapper, UserImageWrapper, UserName } from "./style";
import { Button, Searchbar, Image, Icon } from "../../atoms";
import { LoginIcon } from '@heroicons/react/outline';
import { UserIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setUserDataFromLogin } from "../../store/actions/userDataAction";
import theme from "../../theme";

const Header = ({}) => {
	const { user, error, isLoading } = useUser();
	const [userData, setUserData] = useState({});
	const [userDropdownStatus, setUserDropdownStatus] = useState(false);
  const dispatch = useDispatch();
	const userDataSelector = useSelector((state) => state.userData);

  // useEffect(() => {
  //   dispatch(setUserLanguage('it'));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(setUserDataFromLogin(user));
  }, [user]);

	useEffect(() => {
    setUserData(userDataSelector);
  }, [userDataSelector]);

	const handleOnClickUser = () => {
		setUserDropdownStatus(!userDropdownStatus);
	}

	return (
		<HeaderContainer>
			<Searchbar />
			<ActionWrapper>
				{user ? (
					<UserWrapper
						onClick={() => handleOnClickUser()}
					>
						<UserImageWrapper>
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
						<UserName>{userData.given_name}</UserName>
						<Icon
							stroke="transparent"
							fill={theme.colors.element.dark}
							width="22px"
							height="22px"
						>
							{!userDropdownStatus ? (<ChevronDownIcon />) : (<ChevronUpIcon />)}
						</Icon>
					</UserWrapper>
				) : (
					<Button
						active
						url="/api/auth/login"
					>
						<LoginIcon />
					</Button>
				)}
			</ActionWrapper>
		</HeaderContainer>
	)
};

export default Header;