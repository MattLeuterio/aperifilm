import theme from '../../theme';
import { Bottom, CardContainer, Left, Right, StatisticsContainer, Top } from './style';
import MainImageMock from '../../assets/images/background-mock.jpg';
import { ActionButtons, Badge, Icon, Image, RatingBottle, StatisticsRowCard } from '../../atoms';
import Montserrat from '../../typography/montserrat';
import ActionsProductButton from '../ActionsProductButton';
import { ShareIcon } from '@heroicons/react/solid';
import { searchGenre } from '../../js/genreList';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { checkImage, genderPlaceholder, imgBasePath, langConverter, pTypeConverter, roundVote, textToPath, tmdbApiKey } from '../../js/utility';
import { getProductDetails } from '../../store/actions/productAction';
import Router from 'next/router';
import useMediaQuery from '../../hooks/useMediaQuery';

const Card = ({
	product, title, className, colorText, handleOnClick, 
	backgroundColor, active, type, isCardTrending,
	widthCard, heightCard, productType, totalViews, totalVotes, position,
	summary, genre, mainImg, vote
}) => {
	const isTablet = useMediaQuery(769);
	const [productDetails, setProductDetails] = useState({});
	const userLanguageState = useSelector((state) => state.userData.language);
	const productDetailsState = useSelector((state) => state.product.productDetails);
	const userDataListProductsRedux = useSelector((state) => state.userData.list_products);

	const getDetailsProduct = async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/${pTypeConverter(productType)}
			/${product?.id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
			).then(res => res.json());
		setProductDetails(res);
	}

		useEffect(() => {
			setProductDetails(productDetailsState);
		}, [productDetailsState]);
		
		useEffect(() => {
			getDetailsProduct();
		}, [userLanguageState, productDetailsState, product])

		const handleOnClickCard = (e) => {
			Router.push(`/${pTypeConverter(productType)}/${textToPath(product?.title || product?.name)}?id=${product?.id}`);
		}

		const handleOnClickCardPerson = (e) => {
			Router.push(`/person/${textToPath(product?.name)}?id=${product?.id}`);
		}

		const handleOnClickCardCollection = (e) => {
			Router.push(`/movie/collection/${textToPath(product?.name)}?id=${product?.id}`);
		}

		switch(type) {
			case Card.TYPE.DEFAULT:
			case Card.TYPE.MOVIE:
			case Card.TYPE.TV:
				return (
					<CardContainer
						type={type}
						onClick={() => handleOnClickCard()}
						className={className}
						color={colorText}
						backgroundColor={backgroundColor}
						active={active}
						productType={productType}
						genre={genre}
						vote={vote}
						totalViews={totalViews}
						totalVotes={totalVotes}
						widthCard={widthCard}
						heightCard={heightCard}
					>
						<Top type={type}>
							<Image 
								className={`main-image ${product?.backdrop_path ? '' : 'no-image'}`}
								src={checkImage(product?.backdrop_path)}
								alt={`${product?.title || product?.name} image`} 
								width="100%"
								height="150px"
								layout="fixed" 
							/>
							{/* Position Absolute */}
							<Badge text={productType} top="15px" left="15px"/>
							<ActionButtons product={productDetails} size="small" className="action-buttons" />
							{(Boolean(userDataListProductsRedux) && userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === productDetails?.id)?.length > 0) ? (
								<RatingBottle size="small" className="rating-container personal-vote" personalVote vote={userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === productDetails.id)[0]?.user_vote * 2} />
							) : (
								<>
									{productDetails?.vote_average > 0 && (
										<RatingBottle size="small" className="rating-container" vote={roundVote(productDetails?.vote_average, 1)} />
									)}
								</>
							)}
							{/* POSITION ABSOLUTE */}
							{isCardTrending && (
								<Montserrat className="card-position" type="bold" configuration={{fontSize: 24, fontWeight: 600, lineHeight: 1, color: theme.colors.element.l2ight}}>{position}</Montserrat>
							)}
						</Top>

						<Bottom>
							{(Boolean(product?.genre_ids) || Boolean(product?.genres)) && (
								<Montserrat className="card-genre" type="h4" configuration={{lineHeight: "17.07px", color: theme.colors.element.dark}}>{
									searchGenre(
										(Boolean(product?.genre_ids) ? product?.genre_ids[0] : product?.genres[0]), 
										userLanguageState
									)}</Montserrat>
							)}
							<Montserrat className="card-title" type="bold" configuration={{fontSize: 16, fontWeight: 600, lineHeight: "1.2", color: theme.colors.element.light}}>{productDetails?.title || productDetails?.name}</Montserrat>
							<StatisticsContainer type={type}>
								<StatisticsRowCard views={product?.popularity} votes={product?.vote_count}/>
							</StatisticsContainer>

						</Bottom>
					</CardContainer>
				)

			case Card.TYPE.COLLECTION:
				return (
					<CardContainer
						type={type}
						onClick={() => handleOnClickCardCollection()}
						className={className}
						color={colorText}
						backgroundColor={backgroundColor}
						active={active}
						productType={productType}
						genre={genre}
						vote={vote}
						totalViews={totalViews}
						totalVotes={totalVotes}
						widthCard={widthCard}
						heightCard={heightCard}
					>
						<Top type={type}>
							<Image 
								className={`main-image ${product?.backdrop_path ? '' : 'no-image'}`}
								src={checkImage(product?.backdrop_path)}
								alt={`${product?.title || product?.name} image`} 
								width="100%"
								height="150px"
								layout="fixed" 
							/>
							{/* Position Absolute */}
							<Badge text={productType} top="15px" left="15px"/>
						</Top>

						<Bottom>
							<Montserrat className="card-title" type="bold" configuration={{fontSize: 14, fontWeight: 400, lineHeight: "1.4", color: theme.colors.element.light}}>{product?.title || product?.name}</Montserrat>
						</Bottom>
					</CardContainer>
				)

			case Card.TYPE.DISCOVER:
				return (
					<CardContainer
						onClick={() => handleOnClickCard()}
						type={type}
						className={className}
						color={colorText}
						backgroundColor={backgroundColor}
						active={active}
						title={product?.title || product?.name}
						titleProduct={product?.title || product?.name}
						summary={productDetails?.overview}
						productType={productType}
						genre={genre}
						vote={vote}
						totalViews={totalViews}
						totalVotes={totalVotes}
						widthCard={widthCard}
						heightCard={heightCard}
						mainImg={checkImage(product?.backdrop_path)}
					>
						<Top type={type}>
							<Montserrat className="card-title" type="bold" configuration={{fontSize: isTablet ? 20 : 24, lineHeight: "29.26px", color: theme.colors.element.light}}>{productDetails?.title || productDetails?.name}</Montserrat>
							<Montserrat className="card-genre" type="h4" configuration={{lineHeight: "17.07px", color: theme.colors.element.dark}}>{searchGenre(product?.genre_ids[0], userLanguageState)}</Montserrat>
							<Montserrat className="card-description" configuration={{fontSize: 12, lineHeight: "16px", color: theme.colors.element.light}}>{productDetails?.overview}</Montserrat>

							<ActionButtons product={productDetails} />

							<StatisticsContainer type={type}>
								<StatisticsRowCard views={productDetails?.popularity?.toFixed(0)} votes={productDetails?.vote_count}/>
							</StatisticsContainer>
							
							{/* Position Absolute */}
							{!isTablet && (
								<Badge text={productType} top="0" right="0"/>
							)}
						</Top>
						<Bottom type={type}>
							{(Boolean(userDataListProductsRedux) &&userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === productDetails?.id)?.length > 0) ? (
								<RatingBottle personalVote vote={userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === productDetails.id)[0]?.user_vote * 2} />
							) : (
								<>
									{productDetails?.vote_average > 0 && (
										<RatingBottle vote={roundVote(productDetails?.vote_average, 1)} />
									)}
								</>
							)}
						</Bottom>
					</CardContainer>
				)

			case Card.TYPE.PERSON:
				return (
					<CardContainer
						type={type}
						onClick={() => handleOnClickCardPerson()}
						className={className}
						color={colorText}
						backgroundColor={backgroundColor}
						active={active}
						titleProduct={product?.title || product?.name}
						summary={summary}
						productType={productType}
						genre={genre}
						vote={vote}
						totalViews={totalViews}
						totalVotes={totalVotes}
						widthCard={widthCard}
						heightCard={heightCard}
					>
						<Top type={type}>
							<Image 
								className="main-image" 
								src={product?.profile_path ? `${imgBasePath}${product?.profile_path}` : genderPlaceholder(product?.gender)}
								alt={`${product?.name} photo`} 
								width="150px"
								height="150px"
								layout="fixed" 
							/>
							<ActionButtons product={product} type="person-card" className="action-buttons" size="person" />
						</Top>
						<Bottom type={type}>
							<Montserrat className="card-title" type="bold" configuration={{fontSize: 14, fontWeight: 600, lineHeight: "17.07px", color: theme.colors.element.light}}>
								{product?.name}
							</Montserrat>
							<Montserrat className="card-description" configuration={{fontSize: 14, lineHeight: "17.07px", color: theme.colors.element.dark}}>
								{product?.character || product?.department}
							</Montserrat>
						</Bottom>
					</CardContainer>
				)

			case Card.TYPE.TRENDING:
				return (
					<CardContainer
						type={type}
						onClick={() => handleOnClickCard()}
						className={className}
						color={colorText}
						backgroundColor={backgroundColor}
						active={active}
						titleProduct={product?.title || product?.name}
						summary={summary}
						productType={productType}
						genre={genre}
						vote={vote}
						totalViews={totalViews}
						totalVotes={totalVotes}
						widthCard={widthCard}
						heightCard={heightCard}
						mainImg={`${imgBasePath}/${product?.backdrop_path}`}
					>
						<Left type={type}>
							<Image 
								className="main-image" 
								src={checkImage(productDetails?.backdrop_path)}
								alt="aperifilm.com logo" 
								width="220px"
								height="143px"
								layout="fixed" 
							/>
						</Left>
						<Right type={type}>
							<Top type={type}>
								<Montserrat className="card-genre" type="h4" configuration={{lineHeight: "17.07px", color: theme.colors.element.dark}}>{searchGenre(product?.genre_ids[0], userLanguageState)}</Montserrat>
								<Montserrat className="card-title" type="bold" configuration={{fontSize: 16, fontWeight: 600, lineHeight: "1.2", color: theme.colors.element.light}}>{product?.title || product?.name}</Montserrat>
								<StatisticsContainer type={type}>
									<StatisticsRowCard views={product?.popularity} votes={product?.vote_count} />
								</StatisticsContainer>

								{/* POSITION ABSOLUTE */}
								<Montserrat className="card-position" type="bold" configuration={{fontSize: 32, fontWeight: 600, lineHeight: "39.01px", color: theme.colors.element.light}}>{position}</Montserrat>
							</Top>
							<Bottom type={type}>
								{userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === productDetails?.id)?.length > 0 ? (
									<RatingBottle size="small" className="personal-vote" personalVote vote={userDataListProductsRedux[0]?.lists?.vote?.filter(el => el.id === productDetails.id)[0]?.user_vote * 2} />
								) : (
									<>
										{productDetails?.vote_average > 0 && (
											<RatingBottle size="small" vote={roundVote(productDetails?.vote_average, 1)} />
										)}
									</>
								)}
								<ActionButtons product={productDetails} className="action-buttons" />
							</Bottom>
						</Right>
					</CardContainer>
				)
		}
};

Card.TYPE = {
	DEFAULT: 'default',
	MOVIE: 'movie',
	TV: 'tv',
	DISCOVER: 'discover',
	PERSON: 'person',
	TRENDING: 'trending',
	COLLECTION: 'collection'
}

Card.defaultProps = {
	titleProduct: 'Title Product',
	summary: 'Summary product lorem ipsum dolor sit amet consectetur adipisicing elit. Atque rerum vitae ab quibusdam porro illo asperiores facilis laudantium. Dignissimos quis earum tenetur placeat molestias adipisci, provident veritatis soluta corporis facere quam, sed ut rerum beatae tempora nemo. Laboriosam earum dignissimos in cupiditate nam veritatis.',
	productType: 'Product type',
	vote: 0,
	totalViews: 0,
	totalVotes: 0,
	genre: 'Genre',
	mainImg: MainImageMock.src,
	widthCard: '',
	colorText: theme.colors.mainBrandColors.dark,
	backgroundColor: theme.colors.mainBrandColors.dark,
	active: false,
	type: 'default',
}

export default Card;