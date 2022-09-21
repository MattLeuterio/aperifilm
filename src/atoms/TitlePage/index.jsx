import { FormattedMessage } from 'react-intl';
import useMediaQuery from '../../hooks/useMediaQuery';
import Montserrat from '../../typography/montserrat';
import BackButton from '../BackButton';
import { TitlePageContainer } from './style';

const TitlePage = ({
	title, hasBackButton, primaryTitle
}) =>  {
	const isMobile = useMediaQuery(426);
	return (
		<TitlePageContainer>
			{hasBackButton && (
				<BackButton />
			)}
			<Montserrat configuration={{fontSize: isMobile ? 24 : 32, lineHeight: isMobile ? 1.2 : '39px'}} type="titlePage">
				{primaryTitle && (
					<>
						<FormattedMessage defaultMessage={primaryTitle} id={primaryTitle} />{" - "}
					</>
				)}
				<FormattedMessage defaultMessage={title} id={title} />
			</Montserrat>
		</TitlePageContainer>
	)
};



TitlePage.defaultProps = {
	title: 'Title Page',
}

export default TitlePage;