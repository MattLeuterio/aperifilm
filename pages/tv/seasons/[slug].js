/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { CardLeft, CardRight, CardRightOverview, CardRightTitle, CardSeasons, Header, HeaderCover, HeaderInfo, HeaderLeft, ProductDetailsContainer, ResultsContainer } from "../../../src/styles/Pages/seasonsDetailsStyle";
import { useEffect, useState } from "react";
import useMediaQuery from "../../../src/hooks/useMediaQuery";
import { Image, TitlePage } from "../../../src/atoms";
import Router, { useRouter } from "next/router";
import { checkImage, imgBasePath, langConverter, parseContext, textToPath, tmdbApiKey } from "../../../src/js/utility";
import Montserrat from "../../../src/typography/montserrat";
import { DateTime } from "luxon";

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    const resolvedUrl = parseContext(context.resolvedUrl).split('/')[1]
    const res = await fetch(`https://api.themoviedb.org/3/tv/${query.id}?api_key=${tmdbApiKey}&append_to_response=episode_groups`);
    const seasonsDetails = await res.json()
    return {
      props: {
        seasonsDetails,
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

export default function SeasonsDetails({seasonsDetails, productTypeContext, query}) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { slug, id: pid } = router.query;
  const [seasonsDetailsState, setSeasonsDetailsState] = useState({});
  const [noOverview, setNoOverview] = useState(false);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

  useEffect(() => {
    setSeasonsDetailsState(seasonsDetails);
  }, [seasonsDetails]);

  const getDetailsProduct = async () => {

    if (userLanguageState && seasonsDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/tv/${query.id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}&append_to_response=episode_groups`
        ).then(res => res.json());

      const detailsWithOverview = {...details, overview: `${details?.overview?.length > 0 ? details?.overview : seasonsDetails?.overview}`}
    
      if (userLanguageState === 'it' && details?.overview?.length <= 0) {setNoOverview(true)};
        
      setSeasonsDetailsState(detailsWithOverview);
    }
  };

  useEffect(() => {
    getDetailsProduct();
  }, [userLanguageState, seasonsDetails]);
  
  return (
    <ProductDetailsContainer>
      <Head>
        <title>{seasonsDetailsState?.name} | Aperifilm</title>
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

      <TitlePage primaryTitle={"productTypeSeasons"} title={seasonsDetailsState?.name} hasBackButton />
      
      <Header srcImg={`${imgBasePath}${seasonsDetailsState?.backdrop_path}`}>
        <HeaderLeft>
          <HeaderCover>
            <Image alt={`${seasonsDetailsState?.name} poster`} width="100%" height="100%" src={checkImage(seasonsDetailsState?.poster_path)} />
          </HeaderCover>
        </HeaderLeft>
        <HeaderInfo>
          <Montserrat className="header-title-season" type="h3" configuration={{fontWeight: 600}}>
            <FormattedMessage defaultMessage={"infoTvSeasonsTitle"} id={"infoTvSeasonsTitle"} />{" "}
            <Montserrat className="header-title-season-number" htmlAttribute={"span"} configuration={{fontSize: 16, fontWeight: 400}}>{seasonsDetailsState.number_of_seasons < 10 ? `0${seasonsDetailsState?.number_of_seasons}` : `${seasonsDetailsState?.number_of_seasons}`}</Montserrat>
          </Montserrat>
          <Montserrat className="header-title-season" type="h3" configuration={{fontWeight: 600}}>
            <FormattedMessage defaultMessage={"infoTvEpisodesTitle"} id={"infoTvEpisodesTitle"} />{" "}
            <Montserrat className="header-title-season-number" htmlAttribute={"span"} configuration={{fontSize: 16, fontWeight: 400}}>
              {seasonsDetailsState.number_of_episodes < 10 ? `0${seasonsDetailsState?.number_of_episodes}` : `${seasonsDetailsState?.number_of_episodes}`}
            </Montserrat>
          </Montserrat>
        </HeaderInfo>
      </Header>

      <ResultsContainer>
        {seasonsDetailsState?.seasons?.map((item, index) => (
          <CardSeasons key={index} onClick={() => Router.push(`/tv/seasons/season/${item?.season_number}?id=${seasonsDetailsState?.id}`)}>
            <CardLeft>
              <Image 
								className="main-image" 
								src={checkImage(item?.poster_path) }
								alt="aperifilm.com logo" 
								width="100px"
								height="151px"
								layout="fixed" 
							/>
            </CardLeft>
            <CardRight>
              <CardRightTitle>
                <Montserrat className="card-season-title" htmlAttribute={"span"} configuration={{fontSize: 16, fontWeight: 600}}>{item.name}</Montserrat>
                <Montserrat className="card-season-date" htmlAttribute={"span"}>{DateTime.fromISO(item?.air_date)?.toFormat('yyyy').toLocaleString()}</Montserrat>
                {" - "}
                <Montserrat className="card-season-episode" htmlAttribute={"span"}>{item?.episode_count}{" "}<FormattedMessage defaultMessage={"seasonsEpisodes"} id={"seasonsEpisodes"} /></Montserrat>
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
