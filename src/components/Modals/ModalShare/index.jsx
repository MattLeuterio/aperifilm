import theme from '../../../theme';
import { ModalContainer, BackgroundOpacity, Header, Body, Line, ButtonShareContainer } from './style';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon, Image } from '../../../atoms';
import { useRouter } from 'next/router';
import Montserrat from '../../../typography/montserrat';
import { useDispatch, useSelector } from 'react-redux';
import { ClipboardCopyIcon, XIcon } from '@heroicons/react/solid';
import { setModalShare, setModalStories } from '../../../store/actions/appAction';
import useMediaQuery from '../../../hooks/useMediaQuery';
import {
	FacebookShareButton,
	FacebookIcon,
  	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TelegramShareButton,
	TelegramIcon,
	RedditShareButton,
	RedditIcon,
	LinkedinShareButton,
	LinkedinIcon,
	EmailShareButton,
	EmailIcon
} from 'next-share';
import toast from 'react-hot-toast';
import InstagramIcon from "../../../assets/icons/logo-instagram.png";


const ModalShare = ({}) => {
	const isTablet = useMediaQuery(769);
	const router = useRouter();
	const dispatch = useDispatch();
	const [urlToShare, setUrlToShare] = useState("");
	const quoteToShare = ``;
	const hashtagToShare = `#aperifilm`;

	useEffect(() => {
		setUrlToShare(window.location.href);
	}, []);

	const modalStateIsOpen = useSelector((state) => state.app.modalShare?.isOpen);
	const modalStateSelected = useSelector((state) => state.app.modalShare?.selected);
	
	const [copied, setCopied] = useState(false);

	function copy() {
	  const el = document.createElement("input");
	  el.value = urlToShare;
	  document.body.appendChild(el);
	  el.select();
	  document.execCommand("copy");
	  document.body.removeChild(el);
	  setCopied(true);
	  toast.success('shareCopied');
	}

	
	const handleOnClose = () => {
		dispatch(setModalShare({isOpen: false, selected: {}}));
	}

	const handleOnClickStories = () => {
		dispatch(setModalStories({isOpen: true, selected: modalStateSelected}))
		dispatch(setModalShare({isOpen: false, selected: {}}));
	}

	return (
		<>
			{modalStateIsOpen && (
				<>
					<BackgroundOpacity onClick={(e) => handleOnClose(e)}></BackgroundOpacity>
					<ModalContainer
					>
						{/* ICON CLOSE - position absolute */}
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

						<Header>
							<Montserrat 
								className={"modal-title"} 
								configuration={
									{
										fontSize: isTablet ? 24 : 28, 
										fontWeight: 600, 
										color: theme.colors.element.light,
										textAlign: "center",
									}
								}
							>
								<FormattedMessage defaultMessage={"shareTitle"} id={"shareTitle"} />
							</Montserrat>
						</Header>

						<Body>
							<Line>
								{/* Facebook */}
								<FacebookShareButton
									url={urlToShare}
									quote={quoteToShare}
									hashtag={hashtagToShare}
									blankTarget
								>
									<FacebookIcon 
										size={28} 
										round
									/>	
									<Montserrat type={"small"}>
										Facebook
									</Montserrat>
								</FacebookShareButton>

								{/* Twitter */}
								<TwitterShareButton
									url={urlToShare}
									title={quoteToShare}
									hashtag={hashtagToShare}
									blankTarget
								>
									<TwitterIcon size={28} round />
									<Montserrat type={"small"}>
										Twitter
									</Montserrat>
								</TwitterShareButton>

								{/* Linkedin */}
								<LinkedinShareButton url={urlToShare} blankTarget>
									<LinkedinIcon size={28} round />
									<Montserrat type={"small"}>
										Linkedin
									</Montserrat>
								</LinkedinShareButton>
							</Line>

							<Line>
								{/* Whatsapp */}
								<WhatsappShareButton
									url={urlToShare}
									title={quoteToShare}
									separator=":: "
									blankTarget
								>
									<WhatsappIcon size={28} round />
									<Montserrat type={"small"}>
										Whatsapp
									</Montserrat>
								</WhatsappShareButton>

								{/* Telegram */}
								<TelegramShareButton
									url={urlToShare}
									title={quoteToShare}
									blankTarget
								>
									<TelegramIcon size={28} round />
									<Montserrat type={"small"}>
										Telegram
									</Montserrat>
								</TelegramShareButton>

								{/* Reddit */}
								<RedditShareButton
									url={urlToShare}
									title={quoteToShare}
									blankTarget
								>
									<RedditIcon size={28} round />
									<Montserrat type={"small"}>
										Reddit
									</Montserrat>
								</RedditShareButton>
							</Line>

							<Line>
								{/* Email */}
								<EmailShareButton
									url={urlToShare}
									subject={modalStateSelected?.title || modalStateSelected?.name}
									body={`${modalStateSelected?.title || product?.name} - `}
								>
									<EmailIcon size={28} round />
									<Montserrat type={"small"}>
										Email
									</Montserrat>
								</EmailShareButton>
								<ButtonShareContainer onClick={() => copy()}>
									<Icon
										className="icon-copy"
										width="28px"
										height="28px"
										fill={theme.colors.element.dark}
										stroke='transparent'
									>
										<ClipboardCopyIcon />
									</Icon>
									<Montserrat type={"small"}>
										<FormattedMessage defaultMessage={"shareCopyLink"} id={"shareCopyLink"} />
									</Montserrat>
								</ButtonShareContainer>
								<ButtonShareContainer onClick={() => handleOnClickStories()}>
									<Image 
										alt="icon"
										className="icon-instagram"
										src={InstagramIcon.src} 
										width="28px !important"
										height="28px !important"
										layout="fixed" 
									/>
									<Montserrat type={"small"}>
										<FormattedMessage defaultMessage={"createInstagramStories"} id={"createInstagramStories"} />
									</Montserrat>
								</ButtonShareContainer>
							</Line>
						</Body>

					</ModalContainer>
				</>
			)}
		</>
	)
};


ModalShare.defaultProps = {
}

export default ModalShare;