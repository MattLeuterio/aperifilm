import theme from '../../theme';
import { ApericonsContainer, IconContainer } from './style';

const Icon = ({
	children, width, height, fill, stroke, strokeWidth, className
}) => {
		return (
				<IconContainer
					className={className}
					width={width}
					height={height}
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
	width: '20px',
	height: '20px',
	strokeWidth: '2px',
}

export default Icon;