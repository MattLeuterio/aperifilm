import { useState } from 'react';
import theme from '../../theme';
import BackgroundMock from '../../assets/icons/placeholder-no-image-icon.png';
import { Icon, GoTo, CustomMessage } from "../../atoms";
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { GoToWrapper, ImageBox, Product, ProductType, SearchContainer, SearchInput, SuggestionProduct, Title } from './style';
import { useSelector } from 'react-redux';
import { imgBasePath, langConverter, textToPath, tmdbApiKey } from '../../js/utility';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import useMediaQuery from '../../hooks/useMediaQuery';

const Searchbar = ({}) => {
	const [valueSearch, setValueSearch] = useState("");
  const [suggestionBoxVisibility, setSuggestionBoxVisibility] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const userLanguageState = useSelector((state) => state.userData.language);
	const router = useRouter();

	const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

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
				setSearchResults(searchResultsList);
		}
	}

	const handleOnKeyPressEnter = (e, item) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      router.push(`/search?query=${valueSearch.replaceAll(" ", "-")}`);
			onClose();
    }
  };

	const handleOnClickSearchIcon = (e) => {
    router.push(`/search?query=${valueSearch.replaceAll(" ", "-")}`);
    onClose();
  };

	const handleOnClickResult = (item) => {
		onClose();
		router.push(`/${item.media_type}/${textToPath(item?.name) || textToPath(item?.title)}?id=${item?.id}`)
	}

	const onClose = () => {
    setValueSearch('');
    setSuggestionBoxVisibility(false);
  };

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
					{searchResults?.results?.length > 0 ? (
						<>
							{searchResults?.results?.slice(0,7)?.map((item) => (
								<Product
									key={item.id}
									onClick={() => handleOnClickResult(item)}
								>
									<ImageBox
										{...item?.profile_path}
										className={item?.media_type === 'person' ?
										item?.profile_path !== null  ?
										''  
										: 'has-placeholder'
										: item?.backdrop_path !== null ?
										'' 
										: 'has-placeholder' }
										bgResult={
											item?.media_type === 'person' ?
												item?.profile_path !== null  ?
												`${imgBasePath}/${item?.profile_path}`  
												: BackgroundMock.src 
												: item?.backdrop_path !== null ?
												`${imgBasePath}/${item?.backdrop_path}` 
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
								</Product>
							))}
						</>
					) : (
						<CustomMessage text="noResults" style={{margin: '15px', backgroundColor: 'transparent', padding: 0}} />
					)}
					{searchResults?.results?.length > 0 && (
						<GoToWrapper>
							<GoTo handleOnClick={() => onClose()} url={`/search?query=${valueSearch}`}>
								<Icon 
									stroke={theme.colors.mainBrandColors.dark}
									width="18px"
									height="17px"
								>
									<ArrowNarrowRightIcon />
								</Icon>
							</GoTo>
						</GoToWrapper>
					)}
				</SuggestionProduct>
			
	</SearchContainer>
	)
};

Searchbar.defaultProps = {
}

export default Searchbar;