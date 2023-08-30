import { ShareContainer } from './style';
import Icon from '../Icon';
import theme from "../../theme";
import { ShareIcon } from "@heroicons/react/solid";
import { setModalShare } from '../../store/actions/appAction';
import { useDispatch } from 'react-redux';

const Share = ({
	product
}) => {
	const dispatch = useDispatch();

	const handleOnClickShare = () => {
		const isPerson = Boolean(product.gender);
		const isCollection = Boolean(product.parts);
		const isMovie = !isPerson && !isCollection && Boolean(product.title)
		dispatch(setModalShare({
			isOpen: true, 
			selected: {
				id: product.id, 
				title: product.name || product.title,
				product_type: isPerson ? 'person' : isCollection ? 'collection' : isMovie ? 'movie' : 'tv',
			}
		}))
	}

	return (
		<ShareContainer
		>
			<Icon
				className="icon-share"
				fill={theme.colors.element.light}
				width="20px"
				height="20px"
				strokeWidth={0}
				handleOnClick={() => handleOnClickShare()}
			>
				<ShareIcon />
			</Icon>
		</ShareContainer>
	)
};

export default Share;