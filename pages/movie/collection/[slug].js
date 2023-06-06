import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Header, HeaderCover, HeaderInfo, HeaderInfoCrew, HeaderInfoDatas, HeaderInfoDatasGenres, HeaderInfoDatasLeft, HeaderInfoDatasRight, HeaderInfoSummary, HeaderInfoTitle, HeaderInfoVote, HeaderInfoVoteActions, HeaderInfoVoteActionsLeft, HeaderInfoVoteActionsRight, HeaderLeft, InfoCrew, ProductDetailsContainer, ReleaseDate, ResultsContainer, Runtime } from "../../../src/styles/Pages/collectionDetailsStyle";
import { useEffect, useState } from "react";
import useMediaQuery from "../../../src/hooks/useMediaQuery";
import { ActionButtons, Badge, Button, CustomMessage, Icon, Image, RatingBottle, Share, TitlePage } from "../../../src/atoms";
import Router, { useRouter } from "next/router";
import { checkImage, formatDate, imgBasePath, langConverter, parseContext, pTypeConverter, roundVote, textToPath, tmdbApiKey } from "../../../src/js/utility";
import Montserrat from "../../../src/typography/montserrat";
import { CalendarIcon, ClockIcon, ShareIcon } from "@heroicons/react/solid";
import theme from "../../../src/theme";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { setFullscreenPanel } from "../../../src/store/actions/appAction";
import FacebookIcon from "../../../src/assets/icons/logo-facebook.png";
import InstagramIcon from "../../../src/assets/icons/logo-instagram.png";
import TwitterIcon from "../../../src/assets/icons/logo-twitter.png";
import { ActionsProductButton, Card } from "../../../src/components";

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    const resolvedUrl = parseContext(context.resolvedUrl).split('/')[1]
    const res = await fetch(`https://api.themoviedb.org/3/collection/${query.id}?api_key=${tmdbApiKey}`);
    const collectionDetails = await res.json()
    return {
      props: {
        collectionDetails,
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

export default function CollectionDetails({collectionDetails, productTypeContext, query}) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { slug, id: pid } = router.query;
  const [collectionDetailsState, setCollectionDetailsState] = useState({});
  const [noOverview, setNoOverview] = useState(false);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

  useEffect(() => {
    setCollectionDetailsState(collectionDetails);
  }, [collectionDetails]);

  const getDetailsProduct = async () => {

    if (userLanguageState && collectionDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/collection/${query.id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());

      const detailsWithOverview = {...details, overview: `${details?.overview?.length > 0 ? details?.overview : collectionDetails?.overview}`}
    
      if (userLanguageState === 'it' && details?.overview?.length <= 0) {setNoOverview(true)};
        
      setCollectionDetailsState(detailsWithOverview);
    }
  };

  useEffect(() => {
    getDetailsProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLanguageState, collectionDetails]);
  
  return (
    <ProductDetailsContainer>
      <Head>
        <title>{collectionDetails?.name} | Aperifilm</title>
        <meta name="description" content={Boolean(collectionDetails?.overview) ? `${collectionDetails?.overview}` : `${collectionDetails?.name}`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e30000" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta property="og:image" content={`${imgBasePath}${collectionDetails?.poster_path}`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1482" />
        <meta property="og:image:height" content="2222" />
      </Head>

      <TitlePage title={"productTypeCollection"} hasBackButton />
      
      <Header srcImg={`${imgBasePath}${collectionDetailsState?.backdrop_path}`}>
        <HeaderLeft>
          <HeaderCover>
            <Image alt={`${collectionDetailsState?.name} poster`} width="100%" height="100%" src={checkImage(collectionDetailsState?.poster_path)} />
          </HeaderCover>
          <HeaderInfoVoteActions>
            <HeaderInfoVoteActionsRight>
              <ActionButtons product={collectionDetailsState} type="person" className="action-buttons" />
              <Share product={collectionDetailsState} />
            </HeaderInfoVoteActionsRight>
          </HeaderInfoVoteActions>
        </HeaderLeft>
        <HeaderInfo>
          <HeaderInfoDatas>
            <HeaderInfoDatasLeft>
              <Badge isRelative text={'productTypeCollection'} />
            </HeaderInfoDatasLeft>
          </HeaderInfoDatas>
          <HeaderInfoTitle>
            <Montserrat type="productDetailsSectionTitle" configuration={{fontSize: isTablet ? 20 : 24, fontWeight: 400}}>{collectionDetailsState?.name}</Montserrat>
          </HeaderInfoTitle>
          <Montserrat configuration={{}}>
            <FormattedMessage defaultMessage={"collectionPageNumberFilm"} id={"collectionPageNumberFilm"} />{" "}
            <Montserrat htmlAttribute={"span"} configuration={{fontSize: 16, fontWeight: 600}}>{collectionDetailsState?.parts?.length}</Montserrat>
          </Montserrat>
          <HeaderInfoSummary>
            {(noOverview && collectionDetailsState?.overview?.length > 0) && (
              <CustomMessage style={{marginTop: '20px'}} text="Traduzione italiana mancante" />
            )}
            <Montserrat configuration={{lineHeight: '18px'}}>{collectionDetailsState?.overview}</Montserrat>
          </HeaderInfoSummary>
        </HeaderInfo>
      </Header>

      <ResultsContainer>
        {collectionDetailsState?.parts?.map((item, index) => (
          <>
            {isTablet ? (
              <Card isCardTrending key={index} product={item} productType="productTypeFilm" className="card" />
            ) : (
              <Card 
                key={index} 
                product={item} 
                type="trending" 
                productType="productTypeFilm"
                className="card" 
              />
            )}
          </>
        ))}
      </ResultsContainer>
    
    </ProductDetailsContainer>
  );
}
