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
import { roundVote } from '../../js/utility';

const Card = ({
	product, title, className, colorText, handleOnClick, 
	backgroundColor, active, type,
	widthCard, heightCard, productType, totalViews, totalVotes,
	summary, genre, mainImg, vote
}) => {
		const [productDetails, setProductDetails] = useState({});
		const userLanguageState = useSelector((state) => state.userData.language);

		async function getDetailsProduct() {
			const res = await fetch(`https://api.themoviedb.org/3/movie/${product?.id}?api_key=e2330ecaa641a077ab62520c44ab636f&language=${userLanguageState === 'it' ? 'it-IT' : 'en-En'}`).then(res => res.json());
			console.log('ddetails', res);
			setProductDetails(res);
		}

		useEffect(() => {
			getDetailsProduct();
		}, [userLanguageState])

		console.log('productDetails', productDetails);

		switch(type) {
			case Card.TYPE.DEFAULT:
				return (
					<CardContainer
						type={type}
						onClick={handleOnClick}
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
						mainImg={`https://image.tmdb.org/t/p/original/${product?.backdrop_path}`}
					>
						<Top type={type}>
							<Image 
								className="main-image" 
								src={mainImg}
								alt="aperifilm.com logo" 
								width="100%"
								height="150px"
								layout="fixed" 
							/>
							{/* Position Absolute */}
							<Badge text={productType} top="15px" left="15px"/>
							<ActionButtons size="small" className="action-buttons" />
							<RatingBottle size="small" className="rating-container" vote={roundVote(productDetails?.vote_average, 1)} />
						</Top>

						<Bottom>
							<Montserrat className="card-genre" type="h4" configuration={{lineHeight: "17.07px", color: theme.colors.element.dark}}>{searchGenre(product?.genre_ids[0], userLanguageState)}</Montserrat>
							<Montserrat className="card-title" type="bold" configuration={{fontSize: 16, fontWeight: 600, lineHeight: "1.2", color: theme.colors.element.light}}>product?.title</Montserrat>
							<StatisticsContainer type={type}>
								<StatisticsRowCard views="20" votes="216"/>
							</StatisticsContainer>
						</Bottom>
					</CardContainer>
				)

				case Card.TYPE.DISCOVER:
					return (
						<CardContainer
							type={type}
							onClick={handleOnClick}
							className={className}
							color={colorText}
							backgroundColor={backgroundColor}
							active={active}
							titleProduct={product?.title}
							summary={summary}
							productType={productType}
							genre={genre}
							vote={vote}
							totalViews={totalViews}
							totalVotes={totalVotes}
							widthCard={widthCard}
							heightCard={heightCard}
							mainImg={`https://image.tmdb.org/t/p/original/${product?.backdrop_path}`}
						>
							<Top type={type}>
								<Montserrat className="card-title" type="bold" configuration={{fontSize: 24, lineHeight: "29.26px", color: theme.colors.element.light}}>{product?.title}</Montserrat>
								<Montserrat className="card-genre" type="h4" configuration={{lineHeight: "17.07px", color: theme.colors.element.dark}}>{searchGenre(product?.genre_ids[0], userLanguageState)}</Montserrat>
								<Montserrat className="card-description" configuration={{fontSize: 12, lineHeight: "16px", color: theme.colors.element.light}}>{productDetails?.overview}</Montserrat>

								<ActionButtons />

								<StatisticsContainer type={type}>
									<StatisticsRowCard views="20" votes="216"/>
								</StatisticsContainer>
								
								{/* Position Absolute */}
								<Badge text={productType} top="0" right="0"/>
							</Top>
							<Bottom type={type}>
								<Icon
									className=""
									fill={theme.colors.element.light}
									width="20px"
									height="20px"
									strokeWidth={0}
								>
									<ShareIcon />
								</Icon>
								<RatingBottle vote={roundVote(productDetails?.vote_average, 1)} />
							</Bottom>
						</CardContainer>
					)

				case Card.TYPE.PERSON:
					return (
						<CardContainer
							type={type}
							onClick={handleOnClick}
							className={className}
							color={colorText}
							backgroundColor={backgroundColor}
							active={active}
							titleProduct={product?.title}
							summary={summary}
							productType={productType}
							genre={genre}
							vote={vote}
							totalViews={totalViews}
							totalVotes={totalVotes}
							widthCard={widthCard}
							heightCard={heightCard}
							mainImg={`https://image.tmdb.org/t/p/original/${product?.backdrop_path}`}
						>
							<Top type={type}>
								<Image 
									className="main-image" 
									src={mainImg}
									alt="aperifilm.com logo" 
									width="150px"
									height="150px"
									layout="fixed" 
								/>
								<ActionsProductButton className="favorite-btn" size="person" action="favorite"/>
							</Top>
							<Bottom type={type}>
								<Montserrat className="card-title" type="bold" configuration={{fontSize: 14, fontWeight: 600, lineHeight: "17.07px", color: theme.colors.element.light}}>Colleen O'Shaughnessey</Montserrat>
								<Montserrat className="card-description" configuration={{fontSize: 14, lineHeight: "17.07px", color: theme.colors.element.dark}}>Miles 'Tails' Prower (voice)</Montserrat>
							</Bottom>
						</CardContainer>
					)

				case Card.TYPE.TRENDING:
					return (
						<CardContainer
							type={type}
							onClick={handleOnClick}
							className={className}
							color={colorText}
							backgroundColor={backgroundColor}
							active={active}
							titleProduct={product?.title}
							summary={summary}
							productType={productType}
							genre={genre}
							vote={vote}
							totalViews={totalViews}
							totalVotes={totalVotes}
							widthCard={widthCard}
							heightCard={heightCard}
							mainImg={`https://image.tmdb.org/t/p/original/${product?.backdrop_path}`}
						>
							<Left type={type}>
								<Image 
									className="main-image" 
									src={mainImg}
									alt="aperifilm.com logo" 
									width="220px"
									height="143px"
									layout="fixed" 
								/>
							</Left>
							<Right type={type}>
								<Top type={type}>
									<Montserrat className="card-genre" type="h4" configuration={{lineHeight: "17.07px", color: theme.colors.element.dark}}>{searchGenre(product?.genre_ids[0], userLanguageState)}</Montserrat>
									<Montserrat className="card-title" type="bold" configuration={{fontSize: 16, fontWeight: 600, lineHeight: "1.2", color: theme.colors.element.light}}>product?.title</Montserrat>
									<StatisticsContainer type={type}>
										<StatisticsRowCard views="20" votes="216"/>
									</StatisticsContainer>

									{/* POSITION ABSOLUTE */}
									<ActionButtons className="action-buttons" />
								</Top>
								<Bottom type={type}>
									<RatingBottle size="small" vote={2.5} />
									<Montserrat className="card-position" type="bold" configuration={{fontSize: 32, fontWeight: 600, lineHeight: "39.01px", color: theme.colors.element.light}}>01</Montserrat>
								</Bottom>
							</Right>
						</CardContainer>
					)
		}
};

Card.TYPE = {
	DEFAULT: 'default',
	DISCOVER: 'discover',
	PERSON: 'person',
	TRENDING: 'trending'
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