import theme from '../../theme';
import { ApericonsContainer, IconContainer } from './style';

const Icon = ({
	children, width, height, fill, stroke, 
	strokeWidth, className, handleOnClick,
	disable, style
}) => {

	return (
		<IconContainer
			className={className}
			width={width}
			height={height}
			style={style}
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			onClick={handleOnClick}
			disable={disable}
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
	disable: false,
}

export default Icon;