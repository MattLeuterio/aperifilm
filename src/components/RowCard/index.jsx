import { useEffect, useState } from 'react';
import { GoTo, Icon, Image } from '../../atoms';
import { Header, Sidebar, SliderRowCards } from '../Sliders';
import { WelcomeBanner } from '..';
import { Container, Content, Main, Row, RowCards, RowHeader } from './style';
import { Card } from '..';
import LogoAperifilm from "../../assets/images/logo-aperifilm.svg";
import { useSelector } from 'react-redux';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import useMediaQuery from '../../hooks/useMediaQuery';
import Montserrat from '../../typography/montserrat';
import theme from '../../theme';
import { FormattedMessage } from 'react-intl';
import { SwiperSlide } from 'swiper/react';

const RowCard = ({ listProducts, type, title, productType, goToText, totalList }) => {
	const isTablet = useMediaQuery(860);
	return (
		<Row>
			{type !== 'discover' && (
				<RowHeader>
					<Montserrat className="card-title" type="bold" configuration={{fontSize: isTablet ? 20 : 24, fontWeight: 600, lineHeight: "17.07px", color: theme.colors.element.light}}>
						<FormattedMessage defaultMessage={title} id={title} />
						{" "}
						{totalList > 0 && (
							<Montserrat htmlAttribute="span" configuration={{fontSize: isTablet ? 20 : 24, fontWeight: 400, lineHeight: "17.07px", color: theme.colors.element.light}}>
								({totalList})
							</Montserrat>
						)}
					</Montserrat>

					{!isTablet && (
						<GoTo text={goToText} handleOnClick={() => onClose()} url="/search-results">
							<Icon 
								stroke={theme.colors.mainBrandColors.dark}
								width="18px"
								height="17px"
							>
								<ArrowNarrowRightIcon />
							</Icon>
						</GoTo>
					)}				
				</RowHeader>
			)}
			{isTablet ? (
				<SliderRowCards type={type} list={listProducts}>
						{listProducts?.map((item, index) => (				
							<SwiperSlide>
								<Card key={index} product={item} productType={productType} className="card" type={type} />
							</SwiperSlide>			
						)
					)}
				</SliderRowCards>
			) : (
				<RowCards type="default">
					{listProducts?.map((item, index) => (							
							<Card key={index} product={item} productType={productType} className="card" type={type} />
					))}
				</RowCards>
			)}
			{isTablet && (
				 <GoTo fontSize="16px" text={goToText} className="goto-rowcard" handleOnClick={() => onClose()} url="/search-results">
					<Icon 
						stroke={theme.colors.mainBrandColors.dark}
						width="18px"
						height="17px"
					>
						<ArrowNarrowRightIcon />
					</Icon>
				</GoTo>
				)}
		</Row>
	)
};

RowCards.TYPE = {
	DISCOVER: 'discover',
	DEFAULT: 'default',
	PERSON: 'person',
	TRENDING: 'trending'
}

RowCard.defaultProps = {
	listProducts: [],
	totalList: 0
}

export default RowCard;