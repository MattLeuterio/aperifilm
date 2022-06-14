import theme from '../../theme';
import { GoToContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';


const GoTo = ({
	url, text, className, colorText, handleOnClick, children
}) => {
		return (
				<GoToContainer
					onClick={handleOnClick}
					className={className}
					color={colorText}
				>
					<Link href={url}>
							<a>
								<FormattedMessage defaultMessage={text} id={text} />
								{children}
							</a>
					</Link>
				</GoToContainer>
		)
};
GoTo.defaultProps = {
	url: './',
	text: 'goToPage',
	colorText: theme.colors.mainBrandColors.dark
}

export default GoTo;