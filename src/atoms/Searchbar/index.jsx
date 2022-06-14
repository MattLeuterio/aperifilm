import { useState } from 'react';
import theme from '../../theme';
import BackgroundMock from '../../assets/images/background-mock.jpg';
import { Icon, GoTo } from "../../atoms";
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { GoToWrapper, ImageBox, Product, ProductType, SearchContainer, SearchInput, SuggestionProduct, Title, VoteBox } from './style';

const Searchbar = ({}) => {
	const [valueSearch, setValueSearch] = useState("");
  const [suggestionBoxVisibility, setSuggestionBoxVisibility] = useState(false);

	const handleOnChange = (value) => {
    setValueSearch(value);
    if (valueSearch.length >= 2) {
			//dispatch(getSearchResults({ text: valueSearch, page: 1 }));
      setSuggestionBoxVisibility(true);
    } else {
			setSuggestionBoxVisibility(false);
		}
  };

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
				{suggestionBoxVisibility && (
					<SuggestionProduct>
						{suggestionProduct?.map((item) => (
							// <Link
							// 	key={item?.id}
							// 	to={{
							// 		pathname: `/game/${item?.slug}`,
							// 	}}
							// 	onClick={() => handleOnClickGame()}
							// >
								<Product
									key={item.id}
								>
									<ImageBox
										bgResult={
											item?.background_image !== null
												? item?.background_image
												: Background
										}
									></ImageBox>
									<ProductType>{item?.productType}</ProductType>
									<Title>{item?.name}</Title>
									<VoteBox>Voto</VoteBox>
								</Product>
							// </Link>
						))}
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
				)}
		</SearchContainer>
		)
};

Searchbar.defaultProps = {
}

export default Searchbar;