import theme from '../../theme';
import { CustomMessageContainer } from './style';
import { FormattedMessage } from 'react-intl';
import Icon from '../Icon';


export default function CustomMessage ({
	className, text, style, iconSettings, icon
}) {
	
	return (
		<CustomMessageContainer style={style} className={className}>
			{icon && (
				<Icon
					className="icon"
					stroke={iconSettings?.color?.stroke}
					fill={iconSettings?.color?.fill}
					width={iconSettings?.size?.width}
					height={iconSettings?.size?.height}
					strokeWidth={iconSettings?.size?.strokeWidth}
					handleOnClick={() => handleOnClickFavorite()}
				>
					{icon}
				</Icon>
			)}
			<FormattedMessage defaultMessage={text} id={text} />
		</CustomMessageContainer>
	)
};

CustomMessage.defaultProps = {

}