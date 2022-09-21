import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { CardLeft, CardRight, CardRightOverview, CardRightTitle, CardSeasons, Header, HeaderCover, HeaderInfo, HeaderLeft, ProductDetailsContainer, ResultsContainer } from "../../../../src/styles/Pages/seasonDetailsStyle";
import { useEffect, useState } from "react";
import useMediaQuery from "../../../../src/hooks/useMediaQuery";
import { Image, TitlePage } from "../../../../src/atoms";
import Router, { useRouter } from "next/router";
import { addZeroToNum, checkImage, imgBasePath, langConverter, parseContext, textToPath, tmdbApiKey } from "../../../../src/js/utility";
import Montserrat from "../../../../src/typography/montserrat";
import { DateTime } from "luxon";

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    const resolvedUrl = parseContext(context.resolvedUrl).split('/')[1]
    const res = await fetch(`https://api.themoviedb.org/3/tv/${query.id}/season/${query.number}?api_key=${tmdbApiKey}`);
    const seasonDetails = await res.json();
    const resProduct = await fetch(`https://api.themoviedb.org/3/tv/${query.id}?api_key=${tmdbApiKey}`);
    const productDetails = await resProduct.json();
    return {
      props: {
        seasonDetails,
        productDetails,
        productTypeContext: resolvedUrl,
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

export default function SeasonDetails({seasonDetails, productDetails, productTypeContext, query}) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { slug, id: pid } = router.query;
  const [seasonDetailsState, setSeasonDetailsState] = useState({});
  const [productDetailsState, setProductDetailsState] = useState({});
  const [noOverview, setNoOverview] = useState(false);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

  useEffect(() => {
    setSeasonDetailsState(seasonDetails);
  }, [seasonDetails]);

  const getDetailsProduct = async () => {

    if (userLanguageState && seasonDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/tv/${query.id}/season/${query.number}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());

      const productDetails = await fetch(`https://api.themoviedb.org/3/tv/${query.id}?api_key=${tmdbApiKey}`).then(res => res.json());

      const detailsWithOverview = {...details, overview: `${details?.overview?.length > 0 ? details?.overview : seasonDetails?.overview}`}
    
      if (userLanguageState === 'it' && details?.overview?.length <= 0) {setNoOverview(true)};
        
      setSeasonDetailsState(detailsWithOverview);
      setProductDetailsState(productDetails);
    }
  };

  useEffect(() => {
    getDetailsProduct();
  }, [userLanguageState, seasonDetails, productDetails]);
  
  return (
    <ProductDetailsContainer>
      <Head>
        <title>{seasonDetailsState?.name} | Aperifilm</title>
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

      <TitlePage primaryTitle={productDetailsState?.name} title={seasonDetailsState?.name} hasBackButton />
      
      <Header srcImg={`${imgBasePath}${productDetailsState?.backdrop_path}`}>
        <HeaderLeft>
          <HeaderCover>
            <Image alt={`${seasonDetailsState?.name} poster`} width="100%" height="100%" src={checkImage(seasonDetailsState?.poster_path)} />
          </HeaderCover>
        </HeaderLeft>
        <HeaderInfo>
          <Montserrat className="header-title-season" type="h3" configuration={{fontWeight: 600}}>
            <FormattedMessage defaultMessage={"seasonsYear"} id={"seasonsYear"} />{" "}
            <Montserrat className="header-title-season-number" htmlAttribute={"span"} configuration={{fontSize: 16, fontWeight: 400}}>
              {DateTime.fromISO(seasonDetailsState?.air_date)?.toFormat('yyyy').toLocaleString()}
            </Montserrat>
          </Montserrat>
          <Montserrat className="header-title-season" type="h3" configuration={{fontWeight: 600}}>
            <FormattedMessage defaultMessage={"infoTvEpisodesTitle"} id={"infoTvEpisodesTitle"} />{" "}
            <Montserrat className="header-title-season-number" htmlAttribute={"span"} configuration={{fontSize: 16, fontWeight: 400}}>
              {seasonDetailsState?.episodes?.length < 10 ? `0${seasonDetailsState?.episodes?.length}` : `${seasonDetailsState?.episodes?.length}`}
            </Montserrat>
          </Montserrat>
        </HeaderInfo>
      </Header>

      <ResultsContainer>
        {seasonDetailsState?.episodes?.map((item, index) => (
          <CardSeasons onClick={() => Router.push(
            {
              pathname: `/tv/seasons/season/episode/${item.episode_number}`,
              query: {
                 id: query.id,
                 season: item.season_number,
                 episode: item.episode_number
              }
            }
          )}>
            <CardLeft>
              <Image 
								className="main-image" 
								src={checkImage(item?.still_path) }
								alt="aperifilm.com logo" 
								width="219px"
								height="143px"
								layout="fixed" 
							/>
            </CardLeft>
            <CardRight>
              <CardRightTitle>
                <Montserrat className="card-season-title" htmlAttribute={"span"}>
                  <FormattedMessage defaultMessage={"seasonsEpisode"} id={"seasonsEpisode"} />
                  {" "}
                  {addZeroToNum(item?.episode_number)}
                </Montserrat>
                <Montserrat configuration={{fontSize: 16, fontWeight: 600}} className="card-season-date" htmlAttribute={"span"}>
                  {" - "}
                  {item?.name}
                </Montserrat>
              </CardRightTitle>
              <CardRightOverview>
                {item?.overview}
              </CardRightOverview>
            </CardRight>
          </CardSeasons>
        ))}
      </ResultsContainer>
    
    </ProductDetailsContainer>
  );
}