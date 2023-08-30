import theme from '../../../theme';
import { ModalContainer, BackgroundOpacity, Header, Body, Line, CopyUrl } from './style';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { Icon } from '../../../atoms';
import { useRouter } from 'next/router';
import Montserrat from '../../../typography/montserrat';
import { useDispatch, useSelector } from 'react-redux';
import { ClipboardCopyIcon, XIcon } from '@heroicons/react/solid';
import { setModalShare } from '../../../store/actions/appAction';
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


const ModalShare = ({
	product
}) => {
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
										fontSize: isTablet ? 24 : 36, 
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
									size={36} 
									round
								/>	
							</FacebookShareButton>

							{/* Twitter */}
							<TwitterShareButton
								url={urlToShare}
								title={quoteToShare}
								hashtag={hashtagToShare}
								blankTarget
							>
								<TwitterIcon size={36} round />
							</TwitterShareButton>

							{/* Reddit */}
							<RedditShareButton
								url={urlToShare}
								title={quoteToShare}
								blankTarget
							>
								<RedditIcon size={36} round />
							</RedditShareButton>

							{/* Linkedin */}
							<LinkedinShareButton url={urlToShare} blankTarget>
								<LinkedinIcon size={36} round />
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
									<WhatsappIcon size={36} round />
								</WhatsappShareButton>

								{/* Telegram */}
								<TelegramShareButton
									url={urlToShare}
									title={quoteToShare}
									blankTarget
								>
									<TelegramIcon size={36} round />
								</TelegramShareButton>

								{/* Email */}
								<EmailShareButton
									url={urlToShare}
									subject={product?.title || product?.name}
									body={`${product?.title || product?.name} - `}
								>
									<EmailIcon size={36} round />
								</EmailShareButton>
							</Line>

							<Line>
								<CopyUrl onClick={() => copy()}>
									<Icon
										className="icon-copy"
										width="31px"
										height="31px"
										fill={theme.colors.element.dark}
										stroke='transparent'
									>
										<ClipboardCopyIcon />
									</Icon>
									<Montserrat type={"small"}>
										<FormattedMessage defaultMessage={!copied ? "shareCopyLink" : "shareCopied"} id={!copied ? "shareCopyLink" : "shareCopied"} />
									</Montserrat>
								</CopyUrl>
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