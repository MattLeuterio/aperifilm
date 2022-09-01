import theme from '../../theme';
import { Welcome, FullScreenPanelContainer, WelcomeDescription, WelcomeTitle } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon, Image } from '../../atoms';
import { Router } from 'next/router';
import { XCircleIcon } from '@heroicons/react/outline';
import AperitifBottleWhite from "../../assets/icons/aperitif-bottle-disable.png"
import AperitifBottleHalf from "../../assets/icons/aperitif-bottle-half.png"
import Montserrat from '../../typography/montserrat';
import IconWelcome from "../../assets/icons/apericheers-red.png";
import { useDispatch, useSelector } from 'react-redux';
import { XIcon } from '@heroicons/react/solid';
import { setFullscreenPanel } from '../../store/actions/appAction';
import SliderFullScreen from '../Sliders/SliderFullScreen';


const FullScreenPanel = ({
	list
}) => {
	const dispatch = useDispatch();
	const isOpenState = useSelector((state) => state.app.fullScreenPanel);

	const handleOnClose = () => {
		dispatch(setFullscreenPanel({isOpen: false, selected: 0}));
	}

	return (
		<>
			{isOpenState.isOpen && (
				<FullScreenPanelContainer
				>
					<Icon
						handleOnClick={() => handleOnClose()}
						className="icon-close"
						width="40px"
						height="40px"
						fill={theme.colors.element.light}
						stroke='transparent'
					>
						<XIcon />
					</Icon>
					<SliderFullScreen indexImage={isOpenState.selected} imagesList={list} />
				</FullScreenPanelContainer>
			)}
		</>
	)
};


FullScreenPanel.defaultProps = {
}

export default FullScreenPanel;