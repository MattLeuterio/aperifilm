import theme from '../../theme';
import { ButtonContainer, Label, Number, NumberWrapper } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import Icon from '../Icon';
import { Router } from 'next/router';


const Button = ({
	url, text, className, colorText, handleOnClick, 
	children, backgroundColor, active, size,
	iconWidth, iconHeight, iconStroke, iconFill,
	number
}) => {

		return (
				<ButtonContainer
					size={size}
					onClick={handleOnClick}
					className={className}
					color={colorText}
					backgroundColor={backgroundColor}
					active={active}
				>
					{children && (
						<Icon 
							className="icon"
							width={iconWidth}
							height={iconHeight}
							fill={iconFill}
							stroke={iconStroke}
						>
							{children}
						</Icon>
					)}

					{url.length > 0 ? (
						<Link href={url}>
							<a>
								<FormattedMessage defaultMessage={text} id={text} />
							</a>
						</Link>
					) : (
						<Label active={active}><FormattedMessage defaultMessage={text} id={text} /></Label>
					)}

					{number > 0 && (
						<NumberWrapper active={active}>
							<Number>{number}</Number>
						</NumberWrapper>
					)}
				</ButtonContainer>
		)
};

Button.SIZE = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large'
}

Button.defaultProps = {
	url: '',
	text: 'buttonLogin',
	colorText: theme.colors.mainBrandColors.dark,
	backgroundColor: theme.colors.mainBrandColors.dark,
	active: false,
	size: 'small',
	iconWidth: '20px',
	iconHeight: '20px',
	iconFill: 'transparent',
	iconStroke: theme.colors.element.light,
	number: 0
}

export default Button;