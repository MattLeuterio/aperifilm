import theme from '../../theme';
import { GoToContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Montserrat from '../../typography/montserrat';


const GoTo = ({
	url, text, className, colorText, handleOnClick, 
	children, fontSize, fontWeight
}) => {
	//console.log('goto url', url)
		return (
				<GoToContainer
					onClick={handleOnClick}
					className={className}
					color={colorText}
					fontSize={fontSize}
					fontWeight={fontWeight}
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
	colorText: theme.colors.mainBrandColors.dark,
	fontSize: '12px',
	fontWeight: 600
}

export default GoTo;