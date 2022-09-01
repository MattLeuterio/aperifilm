import { useEffect, useState } from 'react';
import { Background, Slide, SliderFullScreenContainer } from './style';
import useMediaQuery from '../../../hooks/useMediaQuery';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch } from 'react-redux';
import { setFullscreenPanel } from '../../../store/actions/appAction';

const SliderFullScreen = ({indexImage, imagesList}) => {
	const isTablet = useMediaQuery(769);
	const dispatch = useDispatch();

	return (
		<>
			<SliderFullScreenContainer>
				<Swiper
					initialSlide={indexImage}
					loop
					navigation={true}
					pagination={{
						type: "fraction"
					}}
					modules={[Navigation, Pagination]}
				>
					{imagesList?.map(img => (
						<SwiperSlide>
							<Slide urlImage={`https://image.tmdb.org/t/p/original/${img?.file_path}`}></Slide>
						</SwiperSlide>
					))}
				</Swiper>
			</SliderFullScreenContainer>
		</>
	)
};

SliderFullScreen.defaultProps = {
}

export default SliderFullScreen;