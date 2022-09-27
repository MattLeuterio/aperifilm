import theme from '../../theme';
import { PaginationContainer } from './style';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';


const Paginate = ({
	totalPages, onChange
}) => {
		return (
				<PaginationContainer
				>
					<Stack spacing={2}>
						<Pagination siblingCount={0} onChange={onChange} size='small' count={totalPages <= 500 ? totalPages : 500} />
					</Stack>
				</PaginationContainer>
		)
};
Paginate.defaultProps = {

}

export default Paginate;