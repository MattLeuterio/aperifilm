import { useState } from 'react';
import theme from '../../theme';
import BackgroundMock from '../../assets/images/background-mock.jpg';
import { Icon, GoTo } from "../../atoms";
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { GoToWrapper, ImageBox, Product, ProductType, SearchContainer, SearchInput, SuggestionProduct, Title, VoteBox } from './style';
import { useSelector } from 'react-redux';
import { langConverter, textToPath, tmdbApiKey } from '../../js/utility';
import { FormattedMessage } from 'react-intl';
import { Router, useRouter } from 'next/router';

const Searchbar = ({}) => {
	const [valueSearch, setValueSearch] = useState("");
  const [suggestionBoxVisibility, setSuggestionBoxVisibility] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const userLanguageState = useSelector((state) => state.userData.language);
	const router = useRouter();

	const handleOnChange = (value) => {
    setValueSearch(value);
    if (valueSearch.length >= 2) {
			getSearchResults();
      setSuggestionBoxVisibility(true);
    } else {
			setSuggestionBoxVisibility(false);
		}
  };

	const getSearchResults = async () => {
		if (userLanguageState) {
			const searchResultsList = await fetch(
				`https://api.themoviedb.org/3/search/multi?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}&query=${valueSearch}`
				).then(res => res.json());
				console.log('searchResultsList', searchResultsList)
				setSearchResults(searchResultsList);
		}
	}

	const handleOnKeyPressEnter = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      history.push(`/search/${valueSearch.replaceAll(" ", "-").toLowerCase()}`);
      onClose();
    }
  };

	const handleOnClickSearchIcon = (e) => {
    history.push(`/search/${valueSearch.replaceAll(" ", "-")}`);
    onClose();
  };

	const onClose = () => {
    setValueSearch('');
    setSuggestionBoxVisibility(false);
  };

	console.log('BackgroundMock', BackgroundMock);

	const suggestionProduct = [
		{
			id: 1,
			slug: `/film/ciao`,
			background_image: BackgroundMock.src,
			name: `How Met Your Mother`,
			productType: 'film'
		},
		{
			id: 2,
			slug: `/film/ciao`,
			background_image: BackgroundMock.src,
			name: `How Met Your Mother How Met Your Mother How Met Your Mother How Met Your Mother`,
			productType: 'serie tv'
		},
		{
			id: 3,
			slug: `/film/ciao`,
			background_image: BackgroundMock.src,
			name: `How Met Your Mother`,
			productType: 'film'
		},
		{
			id: 4,
			slug: `/film/ciao`,
			background_image: BackgroundMock.src,
			name: `How Met Your Mother`,
			productType: 'film'
		},
		{
			id: 5,
			slug: `/film/ciao`,
			background_image: BackgroundMock.src,
			name: `How Met Your Mother`,
			productType: 'film'
		},
		{
			id: 6,
			slug: `/film/ciao`,
			background_image: BackgroundMock.src,
			name: `How Met Your Mother`,
			productType: 'film'
		},
		{
			id: 7,
			slug: `/film/ciao`,
			background_image: BackgroundMock.src,
			name: `How Met Your Mother`,
			productType: 'film'
		},
	];
		return (
			<SearchContainer>
				<SearchInput
					type="text"
					placeholder="Search"
					value={valueSearch}
					onChange={(e) => handleOnChange(e.target.value)}
					onKeyPress={(e) => handleOnKeyPressEnter(e)}
					maxlength="10"
				/>
				<Icon
					className="icn-search"
					size="20px"
					fill={theme.colors.element.dark}
					strokeWidth="0px"
					>
						{valueSearch.length ? (
							<XIcon
								onClick={() => onClose()}
							/>
						) : (
							<SearchIcon
								onClick={(e) => handleOnClickSearchIcon(e)}
							/>
						)}
					</Icon>

					<SuggestionProduct isVisible={suggestionBoxVisibility}>
						{searchResults?.results?.length > 0 && (
							<>
								{searchResults?.results?.slice(0,7)?.map((item) => (
									<Product
										key={item.id}
										onClick={() => router.push(`/${item.media_type}/${textToPath(item?.name) || textToPath(item?.title)}?id=${item?.id}`)}
									>
										<ImageBox
											{...item?.profile_path}
											bgResult={
												item?.media_type === 'person' ?
													item?.profile_path !== null  ?
													`https://image.tmdb.org/t/p/original/${item?.profile_path}`  
													: BackgroundMock 
													: item?.backdrop_path !== null ?
													`https://image.tmdb.org/t/p/original/${item?.backdrop_path}` 
													: BackgroundMock.src 
												}
										></ImageBox>
										<ProductType>{item?.media_type  === 'person' ? (
												<FormattedMessage defaultMessage={"productTypePerson"} id={"productTypePerson"} />
											) : item?.media_type === 'movie' ? (
												<FormattedMessage defaultMessage={"productTypeFilm"} id={"productTypeFilm"} /> 
											) : (
												<FormattedMessage defaultMessage={"productTypeTvSeries"} id={"productTypeTvSeries"} />
											)
										}
									</ProductType>
										<Title>{item?.name || item?.title }</Title>
										<VoteBox>Voto</VoteBox>
									</Product>
								))}
							</>
						)}
						<GoToWrapper>
							<GoTo handleOnClick={() => onClose()} url="/search-results">
								<Icon 
									stroke={theme.colors.mainBrandColors.dark}
									width="18px"
									height="17px"
								>
									<ArrowNarrowRightIcon />
								</Icon>
							</GoTo>
						</GoToWrapper>
					</SuggestionProduct>
				
		</SearchContainer>
		)
};

Searchbar.defaultProps = {
}

export default Searchbar;