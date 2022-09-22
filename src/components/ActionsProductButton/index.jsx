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


const ActionsProductButton = ({
	className, active, size, action, product
}) => {
		const router = useRouter();
		const dispatch = useDispatch();
		const [isActive, setIsActive] = useState(false);
		const [userDataListProducts, setUserDataListProducts] = useState([]);
		const [type, setType] = useState('');

		const userDataListProductsRedux = useSelector((state) => state.userData.list_products);

		const userData = useSelector((state) => state.userData)

		useEffect(() => {
			console.log('here 1')
			setUserDataListProducts(userDataListProductsRedux);
		}, [userDataListProductsRedux])

		useEffect(() => {
			console.log('here 2')
			setIsActive(isAlreadyOnTheList(action, product?.id))
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
			console.log('CLICK - action type', type);
			setIsActive(!isActive);
		}

		const handleOnClickVote = () => {
			console.log('CLICK - VOTE');
		}

		const handleOnClickWatch = () => {
			console.log('CLICK - WATCH');
			console.log('isActive', isActive);
			if (!isActive) {
				const json = {
					...userDataListProductsRedux[0].lists,
					"watch": [
						...userDataListProductsRedux[0].lists.watch,
						{...product}]
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
				console.log('---------REMOVE PRODUCT ---------')
				const newFavoriteList = userData.list_products[0].lists.watch.filter(el => el.id !== product.id);
				console.log('newFavoriteList', newFavoriteList);
				const json = {
					...userDataListProductsRedux[0].lists,
					"watch": newFavoriteList
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
		}

		const handleOnClickFavorite = () => {
			console.log('CLICK - FAVORITE');
			console.log('isActive', isActive);
			const isPerson = Boolean(product.poster_path);

			if (!isActive) {
				const json = {
					...userDataListProductsRedux[0]?.lists,
					"favorite": [
						...userDataListProductsRedux[0].lists.favorite,
						{...product}]
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
				console.log('---------REMOVE PRODUCT ---------')
				const newFavoriteList = userData.list_products[0].lists.favorite.filter(el => el.id !== product.id);
				console.log('newFavoriteList', newFavoriteList);
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
					"translate": userData.translate,
					"list_products": JSON.stringify(json)
				}
				updateUser(userData.record_id, body);
				dispatch(setUserProducts(json));
			}
		}

		const isAlreadyOnTheList = (type, idProd) => {
			if (userDataListProducts && userDataListProducts[0]?.lists) {
				console.log('isAlreadyOnTheList')
				return Boolean(userDataListProducts[0]?.lists[type].find(el => Number(el.id) === idProd))
			}
		}

		return (
				<ActionsProductButtonContainer
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
							handleOnClick={() => handleOnClickVote()}
						>
							{isActive ? (
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