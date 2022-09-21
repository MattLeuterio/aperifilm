import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { CardLeft, CardRight, CardRightOverview, CardRightTitle, CardSeasons, GuestStarsContainer, GuestStarsResults, Header, HeaderCover, HeaderInfo, HeaderInfoCrew, HeaderInfoData, HeaderInfoSummary, HeaderLeft, InfoCrew, MediaSectionImage, ProductDetailsContainer, ReleaseDate, ResultsContainer, Runtime, SectionContainer } from "../../../../../src/styles/Pages/episodeDetailsStyle";
import { useEffect, useState } from "react";
import useMediaQuery from "../../../../../src/hooks/useMediaQuery";
import { Icon, Image, TitlePage } from "../../../../../src/atoms";
import Router, { useRouter } from "next/router";
import { addZeroToNum, checkImage, formatDate, imgBasePath, langConverter, parseContext, searchPeopleRoleCrew, textToPath, tmdbApiKey } from "../../../../../src/js/utility";
import { CalendarIcon, ClockIcon } from "@heroicons/react/solid";
import Montserrat from "../../../../../src/typography/montserrat";
import { DateTime } from "luxon";
import theme from "../../../../../src/theme";
import Link from "next/link";
import { Card, FullScreenPanel } from "../../../../../src/components";
import { setFullscreenPanel } from "../../../../../src/store/actions/appAction";

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    const resolvedUrl = parseContext(context.resolvedUrl).split('/')[1]
    const res = await fetch(`https://api.themoviedb.org/3/tv/${query.id}/season/${query.season}/episode/${query.episode}?api_key=${tmdbApiKey}`);
    const episodeDetails = await res.json();
    const resProduct = await fetch(`https://api.themoviedb.org/3/tv/${query.id}?api_key=${tmdbApiKey}`);
    const productDetails = await resProduct.json();
    return {
      props: {
        episodeDetails,
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

export default function EpisodeDetails({episodeDetails, productDetails, productTypeContext, query}) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { slug, id: pid } = router.query;
  const [episodeDetailsState, setEpisodeDetailsState] = useState({});
  const [productDetailsState, setProductDetailsState] = useState({});
  const [episodeImagesState, setEpisodeImagesState] = useState({});
  const [episodeVideosState, setEpisodeVideosState] = useState({});
  const [noOverview, setNoOverview] = useState(false);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);
  console.log('query', query)

  useEffect(() => {
    setEpisodeDetailsState(episodeDetails);
  }, [episodeDetails]);

  const getDetailsProduct = async () => {
    if (userLanguageState && episodeDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/tv/${query.id}/season/${query.season}/episode/${query.episode}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());
        
      const productDetails = await fetch(
        `https://api.themoviedb.org/3/tv/${query.id}?api_key=${tmdbApiKey}`).then(res => res.json());
        
      const images = await fetch(
        `https://api.themoviedb.org/3/tv/${query.id}/season/${query.season}/episode/${query.episode}/images?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());

      const videos = await fetch(
        `https://api.themoviedb.org/3/tv/${query.id}/season/${query.season}/episode/${query.episode}/videos?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());
  
      const detailsWithOverview = {...details, overview: `${details?.overview?.length > 0 ? details?.overview : episodeDetails?.overview}`}
    
      if (userLanguageState === 'it' && details?.overview?.length <= 0) {setNoOverview(true)};
        
      setEpisodeDetailsState(detailsWithOverview);
      setProductDetailsState(productDetails);
      setEpisodeImagesState(images);
      setEpisodeVideosState(videos);
    }
  };

  useEffect(() => {
    getDetailsProduct();
  }, [userLanguageState, episodeDetails, productDetails]);

  const handleOnClickImage = (index, isOpen) => {
    dispatch(setFullscreenPanel({isOpen, selected: index}));
  }

  console.log('PRODUCT DETAILS: ', productDetailsState)
  console.log('EPISODE DETAILS: ', episodeDetailsState)
  console.log('EPISODE IMAGES: ', episodeImagesState)
  console.log('EPISODE VIDEOS: ', episodeVideosState)
  
  return (
    <ProductDetailsContainer>
      <Head>
        <title>{episodeDetailsState?.name} | Aperifilm</title>
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

      <TitlePage primaryTitle={`${productDetailsState?.name} - ${addZeroToNum(query.episode)}x${addZeroToNum(query.season)}`} title={episodeDetailsState?.name} hasBackButton />
      
      <Header>
        <HeaderLeft>
          <HeaderCover>
            <Image alt={`${episodeDetailsState?.name} poster`} width="100%" height="100%" src={checkImage(episodeDetailsState?.still_path)} />
          </HeaderCover>
        </HeaderLeft>
        <HeaderInfo>
          <HeaderInfoData>
            {episodeDetailsState?.air_date?.length > 0 && (
              <ReleaseDate>
                <Icon
                  className="icon-date"
                  width="15px"
                  height="16px"
                  fill={theme.colors.element.light}
                  stroke='transparent'
                >
                  <CalendarIcon />
                </Icon>
                <Montserrat type="small">{formatDate(episodeDetailsState?.air_date, userLanguageState)}</Montserrat>
              </ReleaseDate>
            )}
            {episodeDetailsState?.runtime > 0 && (
              <Runtime>
                <Icon
                  className="icon-date"
                  width="15px"
                  height="16px"
                  fill={theme.colors.element.light}
                  stroke='transparent'
                >
                  <ClockIcon />
                </Icon>
                <Montserrat type="small">{episodeDetailsState?.runtime}{" "}<FormattedMessage defaultMessage={"elementMinutes"} id={"elementMinutes"} /></Montserrat>
              </Runtime>
            )}
          </HeaderInfoData>
          <HeaderInfoSummary>
            <Montserrat configuration={{lineHeight: '17.07px'}}>{episodeDetailsState?.overview}</Montserrat>
          </HeaderInfoSummary>
          <HeaderInfoCrew>
            {searchPeopleRoleCrew(episodeDetailsState?.crew, 'director')?.length > 0 && (
              <InfoCrew>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"roleDirector"} id={"roleDirector"} />
                </Montserrat>
                {searchPeopleRoleCrew(episodeDetailsState?.crew, 'director')?.map((p, index) => (
                  <Link key={index} href={`/person/${p.name}?id=${p.id}`}>
                    <a>
                      <Montserrat className="info-crew-name">{p.name}</Montserrat>
                    </a>
                  </Link>
                ))}
                <Montserrat className="info-crew-name">{searchPeopleRoleCrew(episodeDetailsState?.crew, 'director')?.name}</Montserrat>
              </InfoCrew>
            )}
            {searchPeopleRoleCrew(episodeDetailsState?.crew, 'writer')?.length > 0 && (
              <InfoCrew>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"roleScreenplayStory"} id={"roleScreenplayStory"} />
                </Montserrat>
                {searchPeopleRoleCrew(episodeDetailsState?.crew, 'writer')?.map((p, index) => (
                  <Link key={index} href={`/person/${textToPath(p.name)}?id=${p.id}`}>
                    <a>
                      <Montserrat className="info-crew-name">{p.name}</Montserrat>
                    </a>
                  </Link>
                ))}
              </InfoCrew>
            )}
          </HeaderInfoCrew>
        </HeaderInfo>
      </Header>

      {episodeDetailsState?.guest_stars?.length > 0 && (
        <SectionContainer>
          <Montserrat configuration={{fontSize: isTablet ? 20 : 24, lineHeight: "29.26px", fontWeight: 600, color: theme.colors.element.light}}>Guest Stars</Montserrat>
          <GuestStarsResults>
            {episodeDetailsState?.guest_stars?.map((item, index) => (
              <Card type="person" key={index} product={item} productType="person" className="card" />
            ))}
          </GuestStarsResults>
        </SectionContainer>
      )}

      {episodeImagesState?.stills && (
        <SectionContainer>
          <Montserrat configuration={{fontSize: isTablet ? 20 : 24, lineHeight: "29.26px", fontWeight: 600, color: theme.colors.element.light}}>Media</Montserrat>
          <GuestStarsResults>
            {episodeImagesState?.stills?.map((item, index) => (
              <MediaSectionImage
                version=""
                onClick={() => handleOnClickImage(index, true)}
                name={`${episodeDetailsState?.title} image ${index}`}
                srcImages={`${imgBasePath}/${item?.file_path}`}
              ></MediaSectionImage>
            ))}
          </GuestStarsResults>
        </SectionContainer>
      )}

      <FullScreenPanel list={episodeImagesState?.stills} />
    </ProductDetailsContainer>
  );
}
