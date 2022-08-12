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
	className, size
}) => {

		return (
			<ActionButtonsContainer className={className}>
				<ActionsProductButton size={size} action="favorite"/>
				<ActionsProductButton size={size} action="watch"/>
				<ActionsProductButton size={size} action="vote"/>
			</ActionButtonsContainer>
		)
};

ActionButtons.defaultProps = {
}

export default ActionButtons;