import theme from '../../theme';
import { BadgeContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Montserrat from '../../typography/montserrat';


const Badge = ({
	url, text, className, backgroundColor, colorText, handleOnClick,
	top, left, bottom, right
}) => {
		return (
				<BadgeContainer
					onClick={handleOnClick}
					className={className}
					backgroundColor={backgroundColor}
					colorText={colorText}
					top={top}
					left={left}
					bottom={bottom}
					right={right}
				>
					{url ? (
						<Link href={url}>
							<a>
								<FormattedMessage defaultMessage={text} id={text} />
							</a>
						</Link>
					) : (
						<Montserrat type="small" configuration={{fontWeight: 600}}>
							<FormattedMessage defaultMessage={text} id={text} />
						</Montserrat>
					)}
				</BadgeContainer>
		)
};
Badge.defaultProps = {
	url: undefined,
	text: 'productTypeFilm',
	backgroundColor: theme.colors.mainBrandColors.transparent,
	colorText: theme.colors.element.light,
	top: 'auto',
	left: 'auto',
	bottom: 'auto',
	right: 'auto'
}

export default Badge;