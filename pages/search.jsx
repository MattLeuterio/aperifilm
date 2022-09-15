import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import Logo from '../src/assets/images/logo-aperifilm.svg';
import { CustomMessage, Image, Tabs, TitlePage } from "../src/atoms";
import { Card } from "../src/components";
import { langConverter, parseContext, textToPath, tmdbApiKey } from "../src/js/utility";
import { HomeContainer, Keyword, ResultsContainer, SearchContainer, TabsContainer } from "../src/styles/Pages/searchStyle";
import Montserrat from "../src/typography/montserrat";

export default function SearchResults({}) {
  const tabsListDefault = [
    {
      id: 'movie',
      label: 'searchFilms',
      icon: null,
      number: 1
    },
    {
      id: 'tv',
      label: 'searchTvSeries',
      icon: null,
      number: 0
    },
    {
      id: 'person',
      label: 'searchPeople',
      icon: null,
      number: 2
    },
    {
      id: 'collections',
      label: 'searchCollections',
      icon: null,
      number: 0
    },
    {
      id: 'keywords',
      label: 'searchKeywords',
      icon: null,
      number: 0
    },
  ]
  const userLanguageState = useSelector((state) => state.userData.language);
  const router = useRouter();
  const [tabsList, setTabsList] = useState(tabsListDefault);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tabsList[0]);
  const [productsDetails, setProductDetails] = useState([]);

  const query = router?.query?.query?.replaceAll('-', ' ');
  

  useEffect(() => {
    getSearchDetails();
  }, [userLanguageState, router]);

  useEffect(() => {
    setTabsList([
      {
        id: 'movie',
        label: 'searchFilms',
        icon: null,
        number: productsDetails?.products?.movie?.length
      },
      {
        id: 'tv',
        label: 'searchTvSeries',
        icon: null,
        number: productsDetails?.products?.tv?.length
      },
      {
        id: 'person',
        label: 'searchPeople',
        icon: null,
        number: productsDetails?.products?.person?.length
      },
      {
        id: 'collections',
        label: 'searchCollections',
        icon: null,
        number: productsDetails?.collections?.total_results
      },
      {
        id: 'keywords',
        label: 'searchKeywords',
        icon: null,
        number: productsDetails?.keywords?.total_results
      },
    ])
  }, [productsDetails])

  const getSearchDetails = async () => {
    if (userLanguageState) {
      const query = router?.query?.query?.replaceAll('-', ' ');
      console.log('query', query);
      const productDetails = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}&query=${query}&include_adult=false?page=${page}`
        ).then(res => res.json());

      const collections = await fetch(
        `https://api.themoviedb.org/3/search/collection?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}&query=${query}&include_adult=false?page=${page}`
        ).then(res => res.json());

      const keywords = await fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}&query=${query}&include_adult=false?page=${page}`
        ).then(res => res.json());

        console.log('collections', collections)

      const movie = productDetails?.results?.filter(el => el.media_type === 'movie');
      const tv = productDetails?.results?.filter(el => el.media_type === 'tv');
      const person = productDetails?.results?.filter(el => el.media_type === 'person');

      setProductDetails(
        {
          products: {
            page: productDetails?.page,
            total_pages: productDetails?.total_pages,
            total_results: productDetails?.total_results,
            movie: [...movie],
            tv: [...tv],
            person: [...person]
          },
          collections: {
            page: collections?.page,
            total_pages: collections?.total_pages,
            total_results: collections?.total_results,
            results: collections?.results,
          },
          keywords: {
            page: keywords?.page,
            total_pages: keywords?.total_pages,
            total_results: keywords?.total_results,
            results: keywords?.results,
          }
        }
      );
    }
  }

  const onChangeTab = tab => {
    setActiveTab(tab);
  };


  console.log('PRODUCT DETAILS: ', productsDetails);
  console.log('ACTIVE TAB: ', activeTab);

  if (query 
    || (productsDetails.products?.movie.length <= 0
        && productsDetails.products?.tv.length <= 0
        && productsDetails.products?.person.length <= 0
        && productsDetails.keywords?.total_results <= 0
        && productsDetails.collections?.total_results <= 0
      )) {
    return (
      <SearchContainer>
        <Head>
          <title>Search results | Aperifilm</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e30000" />
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
  
        <TitlePage title="pageTitleSearchResults" hasBackButton />
  
        <TabsContainer>
          <Tabs
            isSearch
            sizeButtons="large"
            selected={activeTab}
            onChange={onChangeTab}
            tabsList={tabsList}
          />
        </TabsContainer>
        
        <ResultsContainer>
  
          {/* movie */}
          {activeTab?.id === 'movie' && (
            <>
              {
              productsDetails?.products?.movie?.map((prod, index) => (
                <Card key={index} product={prod} productType="productTypeFilm" className="card" />
              ))}
            </>
          )}
  
          {/* tv */}
          {activeTab?.id === 'tv' && (
            <>
              {
              productsDetails?.products?.tv?.map((prod, index) => (
                <Card key={index} product={prod} productType="productTypeTvSeries" className="card" />
              ))}
            </>
          )}
  
          {/* person */}
          {activeTab?.id === 'person' && (
            <>
              {
              productsDetails?.products?.person?.map((prod, index) => (
                <Card key={index} product={prod} productType="productTypePerson" className="card" type="person" />
              ))}
            </>
          )}
  
          {/* collections */}
          {activeTab?.id === 'collections' && (
            <>
              {
              productsDetails?.collections?.results?.map((prod, index) => (
                <Card key={index} product={prod} productType="productTypeCollection" className="card" type="collection" />
              ))}
            </>
          )}
  
          {/* keywords */}
          {activeTab?.id === 'keywords' && (
            <>
              {
              productsDetails?.keywords?.results?.map((kw, index) => (
                <Keyword
                  index={index}
                  onClick={() => Router.push(`/keyword/${textToPath(kw?.name)}?id=${kw?.id}`)}
                >
                  {kw?.name}
                </Keyword>
              ))}
            </>
          )}
        </ResultsContainer>
      </SearchContainer>
    );
  } else {
    return (
      <SearchContainer>
        <Head>
            <title>Search results | Aperifilm</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e30000" />
            <meta name="msapplication-TileColor" content="#ffc40d" />
            <meta name="theme-color" content="#ffffff"></meta>
          </Head>
    
          <TitlePage title="pageTitleSearchResults" hasBackButton />
          <CustomMessage text="noResults" style={{marginTop: '40px'}} />

      </SearchContainer>
    )
  }
}
