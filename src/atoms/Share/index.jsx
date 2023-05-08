import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { ButtonsContainer, CopyUrl, Line, ShareContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Icon from '../Icon';
import theme from "../../theme";
import { ClipboardCopyIcon, ShareIcon, XIcon } from "@heroicons/react/solid";
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
import Montserrat from '../../typography/montserrat';

const Share = ({
	product
}) => {
	const router = useRouter();
	const urlToShare = `https://aperifilm.vercel.app/it${router.asPath}`
	const quoteToShare = ``;
	const hashtagToShare = `#aperifilm`;
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement("input");
    el.value = urlToShare;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

	const handleOnClickShare = () => {
		setIsOpen(true);
	}

	const handleOnClose = () => {
		setIsOpen(false);
		setCopied(false);
	}

	return (
		<ShareContainer
		>
			<Icon
				className="icon-share"
				fill={theme.colors.element.light}
				width="20px"
				height="20px"
				strokeWidth={0}
				handleOnClick={() => handleOnClickShare()}
			>
				<ShareIcon />
			</Icon>

			{isOpen && (
				<ButtonsContainer>
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
					
					<Montserrat className="title" type={"h2"}>
						<FormattedMessage defaultMessage={"shareTitle"} id={"shareTitle"} />
					</Montserrat>

					<Line>
						{/* Facebook */}
						<FacebookShareButton
							url={urlToShare}
							quote={quoteToShare}
							hashtag={hashtagToShare}
							blankTarget
						>
							<FacebookIcon 
								size={32} 
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
							<TwitterIcon size={32} round />
						</TwitterShareButton>

						{/* Reddit */}
						<RedditShareButton
							url={urlToShare}
							title={quoteToShare}
							blankTarget
						>
							<RedditIcon size={32} round />
						</RedditShareButton>

						{/* Linkedin */}
						<LinkedinShareButton url={urlToShare} blankTarget>
							<LinkedinIcon size={32} round />
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
							<WhatsappIcon size={32} round />
						</WhatsappShareButton>

						{/* Telegram */}
						<TelegramShareButton
							url={urlToShare}
							title={quoteToShare}
							blankTarget
						>
							<TelegramIcon size={32} round />
						</TelegramShareButton>

						{/* Email */}
						<EmailShareButton
							url={urlToShare}
							subject={product?.title || product?.name}
							body={`${product?.title || product?.name} - `}
						>
							<EmailIcon size={32} round />
						</EmailShareButton>
					</Line>

					<Line>
						<CopyUrl>
							<Icon
								handleOnClick={() => copy()}
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
				</ButtonsContainer>
			)}

		</ShareContainer>
	)
};

export default Share;