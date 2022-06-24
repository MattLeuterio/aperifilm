import theme from '../../theme';
import { ImageContainer, Img } from './style';

const Image = ({
	width, height, src, className
}) => {
		return (
				<ImageContainer
					className={className}
					width={width}
					height={height}
				>
					<Img src={src} />
				</ImageContainer>
		)
};

Image.defaultProps = {
	width: '50px',
	height: 'auto'
}

export default Image;