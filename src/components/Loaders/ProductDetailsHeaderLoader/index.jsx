import theme from "../../../theme";

const ProductDetailsHeaderLoader = ({ 
	backgroundColor, foregroundColor, speed, width, height
}) => {
	return (
		'loading'
	)
};

ProductDetailsHeaderLoader.defaultProps = {
	speed: 2,
	width: '100%',
	height: 460,
	backgroundColor: theme.colors.component.dark,
	foregroundColor: theme.colors.component.light
}

export default ProductDetailsHeaderLoader;