import { useEffect, useState } from 'react';
import { Slide, SliderRowCardsContainer } from './style';
import useMediaQuery from '../../../hooks/useMediaQuery';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { useDispatch } from 'react-redux';
import { setFullscreenPanel } from '../../../store/actions/appAction';

const SliderRowCards = ({ children, type, list }) => {
	const isTablet = useMediaQuery(769);
	const dispatch = useDispatch();

	switch(type) {
		default:
		case SliderRowCards.TYPE.DEFAULT:
			return (
				<>
					<SliderRowCardsContainer>
					<Swiper
							slidesPerView={"auto"}
        			spaceBetween={10}
							freeMode={true}
						>
							{ children }
						</Swiper>
					</SliderRowCardsContainer>
				</>
			)
		case SliderRowCards.TYPE.DISCOVER:
			return (
				<>
					<SliderRowCardsContainer>
						<Swiper
							slidesPerView={"auto"}
        			spaceBetween={10}
							freeMode={true}
						>
							{ children }
						</Swiper>
					</SliderRowCardsContainer>
				</>
			)
		case SliderRowCards.TYPE.PERSON:
			return (
				<>
					<SliderRowCardsContainer>
						<Swiper
								slidesPerView={"auto"}
								spaceBetween={10}
								freeMode={true}
							>
							{ children }
						</Swiper>
					</SliderRowCardsContainer>
				</>
			)
	}
};

SliderRowCards.TYPE = {
	DISCOVER: 'discover',
	DEFAULT: 'default',
	PERSON: 'person',
	TRENDING: 'trending'
}

SliderRowCards.defaultProps = {
}

export default SliderRowCards;