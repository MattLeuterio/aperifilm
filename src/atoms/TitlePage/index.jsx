import { FormattedMessage } from 'react-intl';
import Montserrat from '../../typography/montserrat';

const TitlePage = ({
	title
}) =>  (
	<Montserrat type="titlePage"><FormattedMessage defaultMessage={title} id={title} /></Montserrat>
);

TitlePage.defaultProps = {
	title: 'Title Page',
}

export default TitlePage;