import theme from '../../theme';
import { BackButtonContainer } from './style';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Montserrat from '../../typography/montserrat';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import Icon from '../Icon';
import { useRouter } from 'next/router'


const BackButton = ({
	
}) => {
		const router = useRouter()
		return (
				<BackButtonContainer
					onClick={() => router.back()}
				>
					<Icon
						className="back-btn-icn"
						width="24px"
						height="24px"
						fill={theme.colors.element.light}
					>
						<ArrowNarrowLeftIcon />
					</Icon>
				</BackButtonContainer>
		)
};
BackButton.defaultProps = {

}

export default BackButton;