import theme from '../../theme';
import { ApericonsContainer, IconContainer } from './style';

const Icon = ({
	children, size, fill, stroke, strokeWidth, src
}) => {
		return (
				<IconContainer
					size={size}
					fill={fill}
					stroke={stroke}
					strokeWidth={strokeWidth}
				>
					{children}
				</IconContainer>
		)
};

Icon.defaultProps = {
	fill: 'transparent',
	stroke: theme.colors.element.light,
	size: '20px',
	strokeWidth: '2px',
}

export default Icon;