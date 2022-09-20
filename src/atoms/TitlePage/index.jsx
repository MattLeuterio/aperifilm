import { FormattedMessage } from 'react-intl';
import Montserrat from '../../typography/montserrat';
import BackButton from '../BackButton';
import { TitlePageContainer } from './style';

const TitlePage = ({
	title, hasBackButton, primaryTitle
}) =>  {
		return (
			<TitlePageContainer>
				{hasBackButton && (
					<BackButton />
				)}
				<Montserrat type="titlePage">
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