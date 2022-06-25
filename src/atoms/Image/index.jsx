import theme from '../../theme';
import { ImageContainer, Img } from './style';

const Image = ({
	width, height, src, className, alt, onClick
}) => {
		return (
				<ImageContainer
					className={className}
					width={width}
					height={height}
					onClick={onClick}
				>
					<Img alt={alt} src={src} />
				</ImageContainer>
		)
};

Image.defaultProps = {
	width: '50px',
	height: 'auto',
	alt: "aperifilm.com"
}

export default Image;