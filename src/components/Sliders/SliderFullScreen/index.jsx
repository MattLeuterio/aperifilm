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
import { imgBasePath } from '../../../js/utility';

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
					{imagesList?.map((img, index) => (
						<SwiperSlide key={index}>
							<Slide urlImage={`${imgBasePath}/${img?.file_path}`}></Slide>
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