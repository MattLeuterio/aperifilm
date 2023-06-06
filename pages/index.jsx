import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { TitlePage } from "../src/atoms";
import { Container, HomeContainer} from "../src/styles/Pages/homeStyle";
import { useEffect, useState } from "react";
import { RowCard } from "../src/components";
import useMediaQuery from "../src/hooks/useMediaQuery";
import { tmdbApiKey } from "../src/js/utility";

export async function getServerSideProps() {
  try {
    const resDiscoverMovie = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=e2330ecaa641a077ab62520c44ab636f');
    const discoverMovieList = await resDiscoverMovie.json();

    const resComingSoon = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=e2330ecaa641a077ab62520c44ab636f&language=it-IT&region=IT');
    const comingSoonMovieList = await resComingSoon.json();

    const resDiscoverTv = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=e2330ecaa641a077ab62520c44ab636f');
    const discoverTvList = await resDiscoverTv.json();
    
    const resPopularPeople = await fetch('https://api.themoviedb.org/3/person/popular?api_key=e2330ecaa641a077ab62520c44ab636f');
    const popularPeopleList = await resPopularPeople.json();

    const resPopularTv = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=e2330ecaa641a077ab62520c44ab636f');
    const popularTvList = await resPopularTv.json();
    
    return {
      props: {
        discoverMovieList,
        comingSoonMovieList,
        discoverTvList,
        popularPeopleList,
        popularTvList
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}

export default function Home({discoverMovieList, comingSoonMovieList, discoverTvList, popularPeopleList, popularTvList}) {
  const [discoverMovieListState, setDiscoverMovieListState] = useState([]);
  const [comingSoonMovieListState, setComingSoonListState] = useState([]);
  const [discoverTvListState, setDiscoverTvListState] = useState([]);
  const [popularPeopleListState, setPopularPeopleListState] = useState([]);
  const [userDataList, setUserDataList] = useState([])
  const userDataRedux = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);

  const getComingSoonByRegion = async () => {
    // setIsLoaded(false);
    if (userLanguageState) {
      const coming = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&language=it-IT&region=${userLanguageState === 'it' ? 'IT' : 'US'}`
        ).then(res => res.json());
      setComingSoonListState(coming?.results.slice(0, 4));
    }
  };

  useEffect(() => {
    if (userDataRedux?.list_products) {
      setUserDataList(userDataRedux?.list_products[0]);
    }
  }, [userDataRedux]);

  useEffect(() => {
    getComingSoonByRegion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLanguageState]);

  useEffect(() => {
    setDiscoverMovieListState(discoverMovieList?.results.slice(0, 2));
    setComingSoonListState(comingSoonMovieList?.results.slice(0, 4));
    setDiscoverTvListState(discoverTvList?.results.slice(0, 2));
    setPopularPeopleListState(popularPeopleList?.results.slice(0, 5));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoverMovieList, comingSoonMovieList, popularPeopleList, popularTvList])

  return (
    <HomeContainer>
      <Head>
        <title>Discover | Aperifilm</title>
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

      <TitlePage title="menuLinkTitleDiscover" />

      {/* Discover FILM */}
      <RowCard 
        listProducts={discoverMovieListState}
        type="discover"
        productType="productTypeFilm"
        goToText="goToDiscoverNewFilm"
        sector="discover"
        url="/discover/movie"
      />

      {/* COMING SOON */}
      <RowCard 
        listProducts={comingSoonMovieListState}
        type="default"
        title="sectionTitleComingOutFilm"
        productType="productTypeFilm"
        goToText="goToPage"
        sector="coming-soon"
        url="/coming-soon"
      />

      {/* POPULAR PEOPLE */}
      <RowCard 
        listProducts={popularPeopleListState}
        type="person"
        title="sectionTitlePopularPeople"
        productType="productTypePeople"
        goToText="goToPage"
        url="/popular-people"
      />

      {/* DISCOVER SERIE TV */}
      <RowCard 
        listProducts={discoverTvListState}
        type="discover"
        productType="productTypeTvSeries"
        goToText="goToDiscoverNewTvSeries"
        sector="discover"
        url="/discover/tv"
      />
    </HomeContainer>
  );
}
