import { useEffect, useState } from 'react';
import { GoTo, Icon, Image } from '../../atoms';
import { Header, Sidebar } from '../index';
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

const RowCard = ({ listProducts, type, title, productType, goToText }) => {
	const isTablet = useMediaQuery(769);
	return (
		<Row>
			{type !== 'discover' && (
				<RowHeader>
					<Montserrat className="card-title" type="bold" configuration={{fontSize: isTablet ? 20 : 24, fontWeight: 600, lineHeight: "17.07px", color: theme.colors.element.light}}><FormattedMessage defaultMessage={title} id={title} /></Montserrat>

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
			<RowCards type="default">
				{listProducts?.map((item, index) => {
					return (
						<Card key={index} product={item} productType={productType} className="card" type={type} />
					)
				})}
			</RowCards>
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
	DEFAULT: 'default'
}

RowCard.defaultProps = {
	listProducts: []
}

export default RowCard;