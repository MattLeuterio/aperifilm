import theme from '../../theme';
import { ActionButtonsContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import Icon from '../Icon';
import { Router } from 'next/router';
import { HeartIcon } from '@heroicons/react/outline';
import { ActionsProductButton } from '../../components';


const ActionButtons = ({
	className, size, product, type
}) => {
		return (
			<ActionButtonsContainer className={className}>
				<ActionsProductButton className={type === 'person-card' ? 'favorite-btn' : ''} product={product} size={size} action="favorite"/>
				{(type !== 'person' && type !== 'person-card') && (
					<>
						<ActionsProductButton product={product} size={size} action="watch"/>
						<ActionsProductButton product={product} size={size} action="vote"/>
					</>
				)}
			</ActionButtonsContainer>
		)
};

ActionButtons.defaultProps = {
}

export default ActionButtons;