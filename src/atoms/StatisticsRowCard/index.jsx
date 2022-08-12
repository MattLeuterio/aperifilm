import theme from '../../theme';
import { StatisticsRowCardContainer, StatsWrapper } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import Icon from '../Icon';
import { Router } from 'next/router';
import { HeartIcon } from '@heroicons/react/outline';
import { ActionsProductButton } from '../../components';
import Montserrat from '../../typography/montserrat';
import { EyeIcon } from '@heroicons/react/solid';
import ApericheersIcon from "../../assets/icons/apericheers-light.png"
import Image from '../Image';


const StatisticsRowCard = ({
	views, votes
}) => {

		return (
			<StatisticsRowCardContainer>
				{Boolean(views) && (
					<StatsWrapper>
						<Icon
							className="icon"
							stroke="transparent"
							fill={theme.colors.element.dark}
							width="14px"
							height="14px"
						>
							<EyeIcon />
						</Icon>
						<Montserrat type="xsmall" configuration={{fontWeight: 600, lineHeight: '12.19px'}}>{views} <FormattedMessage defaultMessage={"cardStatsViews"} id={"cardStatsViews"} /></Montserrat>
					</StatsWrapper>
				)}
				{Boolean(votes) && (
					<StatsWrapper>
						<Icon
							className="icon"
							stroke="transparent"
							fill={theme.colors.element.dark}
							width="14px"
							height="14px"
						>
							<Image 
								className="icon"
								src={ApericheersIcon.src} 
								width="14px !important"
								height="14px !important"
								layout="fixed" 
							/>
						</Icon>
						<Montserrat type="xsmall" configuration={{fontWeight: 600, lineHeight: '12.19px'}}>{views} <FormattedMessage defaultMessage={"cardStatsVotes"} id={"cardStatsVotes"} /></Montserrat>
					</StatsWrapper>
				)}
			</StatisticsRowCardContainer>
		)
};

StatisticsRowCard.defaultProps = {
	views: '',
	votes: ''
}

export default StatisticsRowCard;