import theme from '../../theme';
import { ActionButtonsContainer, ContainerElements, Message } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import Icon from '../Icon';
import { Router, useRouter } from 'next/router';
import { HeartIcon } from '@heroicons/react/outline';
import { ActionsProductButton } from '../../components';
import { useUser } from '@auth0/nextjs-auth0';
import { Tooltip } from '@mui/material';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { XIcon } from '@heroicons/react/solid';
import it from "../../../lang/it.json";
import en from "../../../lang/en.json";
import { useSelector } from 'react-redux';


const Toast = ({
	position, toastOptions, toastBar
}) => {
	const userData = useSelector((state) => state.userData);

	const onClickDismiss = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		toast.dismiss(id);
	}
	return (
		<>
			<Toaster
				position={position}
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={toastOptions}
			>
				{(t) => (
					<ToastBar toast={t}>
					{({ icon, message }) => {
						return (
						<ContainerElements>
							{icon}
							<Message>
								{userData.language === 'en' ? en[message.props.children] : it[message.props.children]}
							</Message>
							{t.type !== 'loading' && (
								<Icon
									handleOnClick={(e) => onClickDismiss(e, t.id)}
									className="icon-close"
									width="18px"
									style={{maxWidth: "18px", minWidth: "18px"}}
									fill={theme.colors.element.light}
									stroke='transparent'
								>
									<XIcon />
								</Icon>
							)}
						</ContainerElements>
					)}}
					</ToastBar>
				)}
			</Toaster>
		</>
	)
};

Toast.defaultProps = {
	position: 'top-center',
	toastOptions: {
		className: '',
		duration: 5000,
		style: {
			background: '#363636',
			color: '#fff',
			boxShadow: "none"
		},
		success: {
			duration: 5000,
			style: {
				background: "#514d6c",
				color: '#fff', 
				boxShadow: "none",
				borderRadius: "14px",
			},
		},
		error: {
			duration: 5000,
			style: {
				background: "#514d6c",
				color: '#fff', 
				boxShadow: "none",
				borderRadius: "14px",
			},
		}
	}
}

export default Toast;