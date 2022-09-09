import theme from '../../theme';
import { CustomMessageContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import Icon from '../Icon';
import { Router } from 'next/router';
import { HeartIcon } from '@heroicons/react/outline';
import { ActionsProductButton } from '../../components';


export default function CustomMessage ({
	className, text, style
}) {
		return (
			<CustomMessageContainer style={style} className={className}>
				<FormattedMessage defaultMessage={text} id={text} />
			</CustomMessageContainer>
		)
};