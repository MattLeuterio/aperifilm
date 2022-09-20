import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { Container, DiscoverContainer } from "../src/styles/Pages/discoverDetailsStyle";
import { useEffect, useState } from "react";
import { Card } from "../src/components";
import useMediaQuery from "../src/hooks/useMediaQuery";
import { TitlePage, Paginate } from "../src/atoms";
import Router, { useRouter } from "next/router";
import {langConverter, parseContext, tmdbApiKey } from "../src/js/utility";
import { FormattedMessage } from "react-intl";

export async function getServerSideProps(context) {
  try {
    
    const query = parseContext(context.query);
    console.log('query', query.mediaType);
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}`);
    const movieDetails = await res.json()
    return {
      props: {
        movieDetails,
        query
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

export default function ProductDetails({movieDetails, query}) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { slug, id: pid } = router.query;
  const [detailsState, setDetailsState] = useState({});
  const [pageSelected, setPageSelected] = useState(1);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

  useEffect(() => {
    setDetailsState(movieDetails);
  }, [movieDetails]);

  const getDetailsProduct = async () => {

    if (userLanguageState && movieDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}&page=${pageSelected}`
        ).then(res => res.json());
    
      setDetailsState(details);
    }
  };

  const getComingSoonByRegion = async () => {
    // setIsLoaded(false);
    if (userLanguageState) {
      const coming = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&language=it-IT&region=${userLanguageState === 'it' ? 'IT' : 'US'}&page=${pageSelected}`
        ).then(res => res.json());
        setDetailsState(coming);
    }
  };

  useEffect(() => {
    getComingSoonByRegion();
  }, [userLanguageState, movieDetails, pageSelected]);
  
  const handleOnChange = (e, page) => {
    setPageSelected(page);
	}
  
  console.log('detailsState', detailsState)

  return (
    <DiscoverContainer>
      <Head>
        <title> Coming soon | Aperifilm</title>
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

      <TitlePage title={"sectionTitleComingOutFilm"} hasBackButton />

      <Container>
        {detailsState?.results?.map((prod, index) => (
          <Card key={index} product={prod} productType="productTypeFilm" className="card" />
        ))}
      </Container>
      {detailsState.total_pages > 1 && (
        <Paginate onChange={(e, page) => handleOnChange(e, page)} totalPages={detailsState?.total_pages} />
      )}
    </DiscoverContainer>
  );
}
