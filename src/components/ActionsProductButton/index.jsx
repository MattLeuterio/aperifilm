import theme from '../../theme';
import { ActionsProductButtonContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon, Image } from '../../atoms';
import { Router } from 'next/router';
import { CheckCircleIcon, HeartIcon, PlusCircleIcon } from '@heroicons/react/outline';
import AperitifBottleWhite from "../../assets/icons/aperitif-bottle-disable.png"
import AperitifBottleHalf from "../../assets/icons/aperitif-bottle-half.png"


const ActionsProductButton = ({
	className, active, size, action, product
}) => {
		const [isActive, setIsActive] = useState(false);
		const [type, setType] = useState('');

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