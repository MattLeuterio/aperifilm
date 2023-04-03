import theme from '../../theme';
import { ActionsProductButtonContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon, Image } from '../../atoms';
import { Router, useRouter } from 'next/router';
import { CheckCircleIcon, HeartIcon, PlusCircleIcon } from '@heroicons/react/outline';
import AperitifBottleWhite from "../../assets/icons/aperitif-bottle-disable.png"
import AperitifBottleHalf from "../../assets/icons/aperitif-bottle-half.png"
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../pages/api/auth/users';
import { setUserProducts } from '../../store/actions/userDataAction';
import { setVotePanel } from '../../store/actions/appAction';
import { tmdbApiKey, wasItVoted } from '../../js/utility';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useTheme } from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';


const ActionsProductButton = ({
	className, active, size, action, product
}) => {
		const globalTheme = useTheme();
		const router = useRouter();
		const dispatch = useDispatch();
		const { user, error, isLoading } = useUser();
		const [isActive, setIsActive] = useState(false);
		const [userDataListProducts, setUserDataListProducts] = useState([]);
		const [isAlreadyVoted, setIsAlreadyVoted] = useState(false);
		const [type, setType] = useState('');
		const [productLanguage, setProductLanguage] = useState({it: {}, en: {}})

		const LightTooltip = styled(({ className, ...props }) => (
			<Tooltip {...props} classes={{ popper: className }} />
		))(({ theme }) => ({
			[`& .${tooltipClasses.tooltip}`]: {
				backgroundColor: globalTheme.colors.element.light,
				color: globalTheme.colors.component.light,
				boxShadow: theme.shadows[1],
				fontSize: 11,
			},
		}));

		const userDataListProductsRedux = useSelector((state) => state.userData.list_products);

		const userData = useSelector((state) => state.userData)

		useEffect(() => {
			setUserDataListProducts(userDataListProductsRedux);
		}, [userDataListProductsRedux])

		useEffect(() => {
			setIsActive(isAlreadyOnTheList(action, product?.id));
			if (Boolean(userDataListProductsRedux)) {
				setIsAlreadyVoted(userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === product?.id).length > 0);
			}
		}, [userDataListProducts, product, updateUser, action])

		useEffect(() => {
			setType(action);
		}, [action])

		useEffect(() => {
			setIsActive(active);
		}, [active])

		const handleOnClick = (e, type) => {
			e.preventDefault();
			e.stopPropagation();
			if (user) setIsActive(!isActive);
		}

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

		const handleOnClickVote = (product) => {
			if (user) {
				const isMovie = Boolean(product.title)
		
				dispatch(setVotePanel({isOpen: true, selected: {
					...productLanguage,
					id: product.id, 
					title: product.name || product.title,
					product_type: isMovie ? 'movie' : 'tv',
					user_vote: wasItVoted(product.id, userDataListProductsRedux[0]?.lists.vote)}}))
			}
		}

		const handleOnClickWatch = () => {
			if (user) {
				getDetails(product);
	
				const isPerson = Boolean(product.gender);
				const isCollection = Boolean(product.parts);
				const isMovie = !isPerson && !isCollection && Boolean(product.title)
				
				if (Object.keys(productLanguage.en)) {
					if (!isActive) {
						const json = {
							...userDataListProductsRedux[0].lists,
							"watch": [
								...userDataListProductsRedux[0].lists?.watch,
								{ 
									...productLanguage,
									id: product.id, 
									title: product.title || product.name, 
									product_type: isPerson ? 'person' : isCollection ? 'collection' : isMovie ? 'movie' : 'tv',
									user_vote: wasItVoted(product.id, userDataListProductsRedux[0]?.lists.vote)
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
						const newWatchList = userData.list_products[0].lists?.watch.filter(el => el.id !== product.id);
						const json = {
							...userDataListProductsRedux[0].lists,
							"watch": newWatchList
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
				}
			}
		}

		const handleOnClickFavorite = () => {
			if (user) {
				getDetails(product);
	
				const isPerson = Boolean(product.gender);
				const isCollection = Boolean(product.parts);
				const isMovie = !isPerson && !isCollection && Boolean(product?.title)
	
				if (Object.keys(productLanguage.en)) {
					if (!isActive) {
						const json = {
							...userDataListProductsRedux[0]?.lists,
							"favorite": [
								...userDataListProductsRedux[0].lists?.favorite,
								{ 
									...productLanguage,
									id: product.id,
									title: product.title || product.name,
									product_type: isPerson ? 'person' : isCollection ? 'collection' : isMovie ? 'movie' : 'tv',
									user_vote: wasItVoted(product.id, userDataListProductsRedux[0]?.lists.vote)
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
						const newFavoriteList = userData.list_products[0].lists.favorite.filter(el => el.id !== product.id);
						const json = {
							...userDataListProductsRedux[0].lists,
							"favorite": newFavoriteList
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
				}
			}
		}

		const isAlreadyOnTheList = (type, idProd) => {
			if (userDataListProducts && userDataListProducts[0]?.lists) {
				return Boolean(userDataListProducts[0]?.lists[type].find(el => Number(el.id) === idProd))
			}
		}

		useEffect(() => {
			getDetails(product)
		}, [product])

		const tooltipText = (type) => {
			switch (type) {
				case "favorite":
					return (<FormattedMessage defaultMessagetext={user ? "actionBtnFavoriteTooltipLogged" : "actionBtnFavoriteTooltip"} id={user ? "actionBtnFavoriteTooltipLogged" : "actionBtnFavoriteTooltip"} />)
				case "watch":
					return (<FormattedMessage defaultMessagetext={user ? "actionBtnWatchTooltipLogged" : "actionBtnWatchTooltip"} id={user ? "actionBtnWatchTooltipLogged" : "actionBtnWatchTooltip"} />)
				case "vote":
					return (<FormattedMessage defaultMessagetext={user ? "actionBtnVoteTooltipLogged" : "actionBtnVoteTooltip"} id={user ? "actionBtnVoteTooltipLogged" : "actionBtnVoteTooltip"} />)
				default:
					return ""
			}
		}

		return (
			<LightTooltip title={tooltipText(type)} placement="top">
				<ActionsProductButtonContainer
					disable={!user}
					size={size}
					type={type}
					onClick={(e) => handleOnClick(e, action)}
					className={className}
					active={isActive}
				>
					{action === 'favorite' && (
						<Icon
							className="icon-action btn--favorite"
							stroke="transparent"
							fill="transparent"
							width="100%"
							height="100%"
							handleOnClick={() => handleOnClickFavorite()}
						>
							<HeartIcon />
						</Icon>
					)}

					{action === 'watch' && (
						<Icon
							className="icon-action btn--watch"
							stroke="transparent"
							fill="transparent"
							width="100%"
							height="100%"
							handleOnClick={() => handleOnClickWatch()}
						>
							{isActive ? (
									<CheckCircleIcon />
								) : (
									<PlusCircleIcon />
							)}
						</Icon>
					)}

					{action === 'vote' && (
						<Icon
							className="icon-action btn--vote"
							stroke="transparent"
							fill="transparent"
							width="100%"
							height="100%"
							handleOnClick={() => handleOnClickVote(product)}
						>
							{isAlreadyVoted ? (
									<Image 
										className="icon-image"
										src={AperitifBottleHalf.src} 
										width="9px !important"
										height="20px !important"
										layout="fixed" 
									/>
								) : (
									<Image 
										className="icon-image"
										src={AperitifBottleWhite.src} 
										width="9px !important"
										height="20px !important"
										layout="fixed" 
									/>
							)}
						</Icon>
					)}
				</ActionsProductButtonContainer>
			</LightTooltip>
		)
};

ActionsProductButton.SIZE = {
	SMALL: 'small',
	MEDIUM: 'medium',
	PERSON: 'person'
}

ActionsProductButton.TYPE = {
	FAVORITE: 'favorite',
	WATCH: 'watch',
	VOTE: 'vote',
	PERSON: 'person'
}

ActionsProductButton.defaultProps = {
	action: '',
	product: {},
	url: '',
	active: false,
	size: 'medium',
}

export default ActionsProductButton;