import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { BackdropSection, CastSection, CollectionInfo, CollectionInfoBottom, CollectionInfoTop, CollectionList, CollectionPart, CollectionSection, ExternalElm, Header, HeaderCover, HeaderInfo, HeaderInfoCrew, HeaderInfoDatas, HeaderInfoDatasGenres, HeaderInfoDatasLeft, HeaderInfoDatasRight, HeaderInfoSummary, HeaderInfoVote, HeaderInfoVoteActions, HeaderInfoVoteActionsLeft, HeaderInfoVoteActionsRight, InfoCrew, InfoSection, InfoSectionElement, InfoSectionWrapperElement, Keyword, LinkSocial, LinkSocialWrapper, MediaSection, MediaSectionGallery, MediaSectionGalleryHeader, MediaSectionGalleryImages, MediaSectionImage, MediaSectionInfo, MediaSectionInfoExternal, MediaSectionInfoExternalLeft, MediaSectionInfoExternalList, MediaSectionInfoExternalRight, MediaSectionInfoExternalToWatch, MediaSectionInfoKeywords, MediaSectionInfoKeywordsList, MediaSectionInfoTitle, ProductDetailsContainer, RecommendationsSection, ReleaseDate, RowCards, Runtime, VideoAndInfoSection, VideoSection } from "../../src/styles/Pages/movieDetailsStyle";
import { useEffect, useState } from "react";
import { FullScreenPanel, RowCard, WelcomeBanner } from "../../src/components";
import useMediaQuery from "../../src/hooks/useMediaQuery";
import { ActionButtons, Badge, Button, CustomMessage, GoTo, Icon, Image, RatingBottle, TitlePage } from "../../src/atoms";
import Router, { useRouter } from "next/router";
import { checkImage, formatDate, langConverter, parseContext, pTypeConverter, roundVote, textToPath, tmdbApiKey } from "../../src/js/utility";
import Montserrat from "../../src/typography/montserrat";
import { CalendarIcon, ClockIcon, DesktopComputerIcon, EyeIcon, HashtagIcon, LinkIcon, ShareIcon } from "@heroicons/react/solid";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import theme from "../../src/theme";
import { DateTime } from "luxon";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { setFullscreenPanel } from "../../src/store/actions/appAction";
import FacebookIcon from "../../src/assets/icons/logo-facebook.png";
import InstagramIcon from "../../src/assets/icons/logo-instagram.png";
import TwitterIcon from "../../src/assets/icons/logo-twitter.png";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    const resolvedUrl = parseContext(context.resolvedUrl).split('/')[1]
    const res = await fetch(`https://api.themoviedb.org/3/${resolvedUrl}/${query.id}?api_key=${tmdbApiKey}`);
    const movieDetails = await res.json()
    return {
      props: {
        movieDetails,
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

export default function ProductDetails({movieDetails, productTypeContext, query}) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { slug, id: pid } = router.query;
  const [loading, setLoading] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [movieDetailsState, setMovieDetailsState] = useState({});
  const [movieCredits, setMovieCredits] = useState([]);
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
  const [movieKeywords, setMovieKeywords] = useState([]);
  const [movieWatchProviders, setMovieWatchProviders] = useState([]);
  const [movieExternalIds, setMovieExternalIds] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [movieCollection, setMovieCollection] = useState([]);
  const [movieRecommendation, setMovieRecommendation] = useState([]);
  const [noOverview, setNoOverview] = useState(false);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

  useEffect(() => {
    setMovieDetailsState(movieDetails);
  }, [movieDetails]);

  const getDetailsProduct = async () => {

    if (userLanguageState && movieDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());

      const detailsWithOverview = {...details, overview: `${details?.overview?.length > 0 ? details?.overview : movieDetails?.overview}`}
    
      if (userLanguageState === 'it' && details?.overview?.length <= 0) {setNoOverview(true)};

      const credits = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/credits?api_key=${tmdbApiKey}`
        ).then(res => res.json());

      let video = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/videos?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());
      
      if (userLanguageState === 'it' && video?.results?.length === 0) {
      video = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/videos?api_key=${tmdbApiKey}&language=en-EN`
        ).then(res => res.json());
      }

      const images = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/images?api_key=${tmdbApiKey}`
        ).then(res => res.json());

      const keywords = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/keywords?api_key=${tmdbApiKey}`
        ).then(res => res.json());

      const externalIds = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/external_ids?api_key=${tmdbApiKey}`
        ).then(res => res.json());

      let watchProviders = {};
      await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/watch/providers?api_key=${tmdbApiKey}`
        ).then(res => res.json()).then(res => {
          Object?.entries(res?.results).map(el => {
            if (el[0].toLowerCase() === (userLanguageState === 'en' ? 'us' : userLanguageState.toLowerCase())) {
              watchProviders = el[1]
            }
          })
        });

      const recommendations = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/recommendations?api_key=${tmdbApiKey}`
        ).then(res => res.json());
        
      setMovieDetailsState(detailsWithOverview);
      setMovieCredits(credits);
      setMovieVideo(video?.results?.filter(vid => vid.site === 'YouTube' && vid.type === 'Trailer').slice(0, 1));
      setMovieImages(setProductImages(images));
      setMovieKeywords(keywords.keywords);
      setMovieWatchProviders(watchProviders);
      setMovieExternalIds(externalIds);
      setMovieRecommendation(recommendations);
    }
  };

  const getCollection = async (id) => {
    const collection = await fetch(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
      ).then(res => res.json());

    setMovieCollection(collection);
  }

  const setProductImages = (images) => {
    let res = [];

    res = [...images?.backdrops, ...images?.posters]
    return {...images, all: res};
  }

  useEffect(() => {
    getDetailsProduct();
  }, [userLanguageState, movieDetails]);

  useEffect(() => {
    if (movieDetailsState?.belongs_to_collection) {
      getCollection(movieDetailsState?.belongs_to_collection?.id);
    }
  }, [userLanguageState, movieDetailsState]);

  useEffect(() => {
    const result = Object.entries(movieExternalIds).reduce(
      (acc, [key, val]) => {
      return [
        ...acc,
        {
          social_id: val,
          title: key,
          icon: key === "facebook_id" ? FacebookIcon.src : key === "twitter_id" ? TwitterIcon.src : key === "instagram_id" ? InstagramIcon.src : '',
          url: key === "facebook_id" 
          ? `https://www.facebook.com/${val}` 
            : key === "twitter_id" 
          ? `https://www.twitter.com/${val}`  
            : key === "instagram_id" 
          ? `https://www.instagram.com/${val}`
            : ''
        }
      ]
    }, []);


    setSocialLinks(result.filter(el => el?.url?.length > 0).filter( el => Boolean(el?.social_id)));
  }, [movieExternalIds])

  const searchPeopleRoleCrew = (list, role) => {

    if (role.toLowerCase() === 'writer') {
      const writer = list?.filter(el => el.job.toLowerCase() === role.toLowerCase());
      const screenplay = list?.filter(el => el.job.toLowerCase() === 'screenplay');
      if (screenplay, writer) {
        return [...writer, ...screenplay];
      }
    }
    
    return list?.filter(el => el.job.toLowerCase() === role.toLowerCase());
  }

  const handleOnClickImage = (index, isOpen) => {
    dispatch(setFullscreenPanel({isOpen, selected: index}));
  }

  return (
    <ProductDetailsContainer>
      <Head>
        <title>{movieDetailsState?.title} | Aperifilm</title>
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

      <TitlePage title={movieDetailsState?.title} hasBackButton />
      
      <Header>
        <HeaderInfo>
          <HeaderInfoDatas>
            <HeaderInfoDatasLeft>
              <Badge isRelative text={pTypeConverter(productTypeContext)} />
              <HeaderInfoDatasGenres>
                {movieDetailsState?.genres?.map((gen, index) => (
                  <Montserrat type="h4" className="header-info-genre" key={index} htmlAttribute={"span"}>{gen.name}</Montserrat>
                ))}
              </HeaderInfoDatasGenres>
            </HeaderInfoDatasLeft>
            <HeaderInfoDatasRight>
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
                <Montserrat type="small">{formatDate(movieDetailsState?.release_date, userLanguageState)}</Montserrat>
              </ReleaseDate>
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
                <Montserrat type="small">{movieDetailsState?.runtime}{" "}<FormattedMessage defaultMessage={"elementMinutes"} id={"elementMinutes"} /></Montserrat>
              </Runtime>
            </HeaderInfoDatasRight>
          </HeaderInfoDatas>
          <HeaderInfoSummary>
            {(noOverview && movieDetailsState?.overview?.length > 0) && (
              <CustomMessage style={{marginTop: '20px'}} text="Traduzione italiana mancante" />
            )}
            <Montserrat configuration={{lineHeight: '18px'}}>{movieDetailsState?.overview}</Montserrat>
          </HeaderInfoSummary>
          <HeaderInfoCrew>
            {searchPeopleRoleCrew(movieCredits?.crew, 'director')?.length > 0 && (
              <InfoCrew>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"roleDirector"} id={"roleDirector"} />
                </Montserrat>
                {searchPeopleRoleCrew(movieCredits?.crew, 'director')?.map((p, index) => (
                  <Link key={index} href={`/person/${p.name}?id=${p.id}`}>
                    <a>
                      <Montserrat className="info-crew-name">{p.name}</Montserrat>
                    </a>
                  </Link>
                ))}
                <Montserrat className="info-crew-name">{searchPeopleRoleCrew(movieCredits?.crew, 'director')?.name}</Montserrat>
              </InfoCrew>
            )}
            {searchPeopleRoleCrew(movieCredits?.crew, 'writer')?.length > 0 && (
              <InfoCrew>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"roleScreenplayStory"} id={"roleScreenplayStory"} />
                </Montserrat>
                {searchPeopleRoleCrew(movieCredits?.crew, 'writer')?.map((p, index) => (
                  <Link key={index} href={`/person/${textToPath(p.name)}?id=${p.id}`}>
                    <a>
                      <Montserrat className="info-crew-name">{p.name}</Montserrat>
                    </a>
                  </Link>
                ))}
              </InfoCrew>
            )}
            {searchPeopleRoleCrew(movieCredits?.crew, 'director of photography')?.length > 0 && (
              <InfoCrew>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"roleDirPhotography"} id={"roleDirPhotography"} />
                </Montserrat>
                {searchPeopleRoleCrew(movieCredits?.crew, 'director of photography')?.map((p, index) => (
                  <Link key={index} href={`/person/${textToPath(p.name)}?id=${p.id}`}>
                    <a>
                      <Montserrat className="info-crew-name">{p.name}</Montserrat>
                    </a>
                  </Link>
                ))}
              </InfoCrew>
            )}
            {searchPeopleRoleCrew(movieCredits?.crew, 'editor')?.length > 0 && (
              <InfoCrew>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"roleEditor"} id={"roleEditor"} />
                </Montserrat>
                {searchPeopleRoleCrew(movieCredits?.crew, 'editor')?.map((p, index) => (
                  <Link key={index} href={`/person/${textToPath(p.name)}?id=${p.id}`}>
                    <a>
                      <Montserrat className="info-crew-name">{p.name}</Montserrat>
                    </a>
                  </Link>
                ))}
              </InfoCrew>
            )}
          </HeaderInfoCrew>
          <HeaderInfoVoteActions>
            <HeaderInfoVoteActionsLeft>
              {movieDetailsState?.vote_count > 0 && (
                <HeaderInfoVote>
                  <Montserrat className="info-vote" type="productDetailsInfoCrewTitle">
                    <FormattedMessage defaultMessage={"averageVote"} id={"averageVote"} />
                  </Montserrat>
                  <RatingBottle vote={roundVote(movieDetailsState?.vote_average, 1)} />   
                </HeaderInfoVote>
              )}
              {movieDetailsState?.vote_count > 0 && (
                <HeaderInfoVote>
                  <Montserrat className="info-vote" type="productDetailsInfoCrewTitle">
                    <FormattedMessage defaultMessage={"yourVote"} id={"yourVote"} />
                  </Montserrat>
                  <RatingBottle personalVote vote={roundVote(movieDetailsState?.vote_average, 1)} />   
                </HeaderInfoVote>
              )}
            </HeaderInfoVoteActionsLeft>
            <HeaderInfoVoteActionsRight>
              <ActionButtons className="action-buttons" />
              <Icon
                  className="icon-share"
                  fill={theme.colors.element.light}
                  width="20px"
                  height="20px"
                  strokeWidth={0}
                >
                  <ShareIcon />
              </Icon>
            </HeaderInfoVoteActionsRight>
          </HeaderInfoVoteActions>
        </HeaderInfo>
        <HeaderCover>
          <Image alt={`${movieDetailsState?.title} poster`} width="100%" height="100%" src={checkImage(movieDetailsState?.poster_path)} />
        </HeaderCover>
      </Header>
      
      <CastSection>
        <RowCard 
          listProducts={movieCredits?.cast?.slice(0, 5)}
          type="person"
          title="sectionTitleCast"
          goToText="goToAllCast"
        />
      </CastSection>

      <VideoAndInfoSection>
        {movieVideo?.length > 0 ? (
          <VideoSection>
            {movieVideo?.map(vid => (
              <ReactPlayer
                controls
                light
                width="100%"
                url={`https://www.youtube.com/watch?v=${vid.key}`} 
              />
            ))}
          </VideoSection>
        ) : movieDetailsState?.backdrop_path && (
          <BackdropSection url={movieDetailsState?.backdrop_path}></BackdropSection>
        )}
        <InfoSection row={movieVideo?.length <= 0 && !movieDetailsState?.backdrop_path}>
          <Montserrat type="productDetailsSectionTitle" configuration={{fontSize: isTablet ? 20 : 24}}>Info</Montserrat>
          <InfoSectionWrapperElement row={movieVideo?.length <= 0 && !movieDetailsState?.backdrop_path}>
            <InfoSectionElement row={movieVideo?.length <= 0 && !movieDetailsState?.backdrop_path}>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementOriginalTitle"} id={"infoSectionElementOriginalTitle"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState?.original_title}</Montserrat>
            </InfoSectionElement>
            <InfoSectionElement row={movieVideo?.length <= 0 && !movieDetailsState?.backdrop_path}>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementStatus"} id={"infoSectionElementStatus"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState?.status}</Montserrat>
            </InfoSectionElement>
            <InfoSectionElement row={movieVideo?.length <= 0 && !movieDetailsState?.backdrop_path}>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementBudget"} id={"infoSectionElementBudget"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState?.budget}</Montserrat>
            </InfoSectionElement>
            <InfoSectionElement row={movieVideo?.length <= 0 && !movieDetailsState?.backdrop_path}>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementRevenue"} id={"infoSectionElementRevenue"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState?.revenue}</Montserrat>
            </InfoSectionElement>
          </InfoSectionWrapperElement>
        </InfoSection>
      </VideoAndInfoSection>

      {movieImages?.all?.length > 0 && (
        <MediaSection>
          <MediaSectionGallery>
            <MediaSectionGalleryHeader>
              <Montserrat type="productDetailsSectionTitle" configuration={{fontSize: isTablet ? 20 : 24}}>
                <FormattedMessage defaultMessage={"mediaSectionGalleryHeader"} id={"mediaSectionGalleryHeader"} />{" "}
                <Montserrat 
                  htmlAttribute="span" type="productDetailsSectionTitle" configuration={{fontWeight: 400, fontSize: isTablet ? 20 : 24}}
                >
                  ({movieImages?.backdrops?.length + movieImages?.posters?.length})
                </Montserrat>
              </Montserrat>
              <GoTo text="goToAllMediaProduct" handleOnClick={() => onClose()} url="/media">
                <Icon 
                  stroke={theme.colors.mainBrandColors.dark}
                  width="18px"
                  height="17px"
                >
                  <ArrowNarrowRightIcon />
                </Icon>
              </GoTo>
            </MediaSectionGalleryHeader>
            <MediaSectionGalleryImages>
              {movieImages?.all?.slice(0, 5).map((image, index) => (
                <MediaSectionImage
                  onClick={() => handleOnClickImage(index, true)}
                  name={`${movieDetails?.title} image ${index}`}
                  srcImages={`https://image.tmdb.org/t/p/original/${image?.file_path}`}
                ></MediaSectionImage>
              ))}
            </MediaSectionGalleryImages>
          </MediaSectionGallery>
          <MediaSectionInfo>
            {movieKeywords?.length > 0 && (
              <MediaSectionInfoKeywords>
                  <MediaSectionInfoTitle>
                    <Icon
                      className="icon-media-info-title"
                      fill={theme.colors.element.dark}
                      strokeWidth={0}
                      width="20px"
                      height="20px"
                    >
                      <HashtagIcon />
                    </Icon>
                    <Montserrat configuration={{color: theme.colors.element.dark, fontWeight: 600}}><FormattedMessage defaultMessage={"mediaSectionInfoKeywords"} id={"mediaSectionInfoKeywords"} /></Montserrat>
                  </MediaSectionInfoTitle>
                  <MediaSectionInfoKeywordsList>
                    {movieKeywords.slice(0, 10).map(kw => (
                      <Keyword
                        onClick={() => Router.push(`/keyword/${textToPath(kw?.name)}?id=${kw?.id}`)}
                      >
                        {kw?.name}
                      </Keyword>
                    ))}
                  </MediaSectionInfoKeywordsList>
              </MediaSectionInfoKeywords>
            )}
            <MediaSectionInfoExternal>
              {Object.entries(movieWatchProviders).length > 0 && (
                <MediaSectionInfoExternalLeft>
                  <MediaSectionInfoTitle>
                    <Icon
                      className="icon-media-info-title"
                      fill={theme.colors.element.dark}
                      strokeWidth={0}
                      width="20px"
                      height="20px"
                    >
                      <DesktopComputerIcon />
                    </Icon>
                    <Montserrat configuration={{color: theme.colors.element.dark, fontWeight: 600}}><FormattedMessage defaultMessage={"mediaSectionInfoHowToWatch"} id={"mediaSectionInfoHowToWatch"} /></Montserrat>
                  </MediaSectionInfoTitle>
                  <MediaSectionInfoExternalToWatch>
                    {/* Streaming */}
                    {movieWatchProviders?.flatrate?.length > 0 && (
                      <>
                        <Montserrat className="title-media-section-info-external" type="small" configuration={{fontWeight: 600, lineHeight: '13px', letterSpacing: '3px'}}>
                          <FormattedMessage defaultMessage={"mediaSectionInfoExternalWatchStreaming"} id={"mediaSectionInfoExternalWatchStreaming"} />
                        </Montserrat>
                        <MediaSectionInfoExternalList>
                          {movieWatchProviders?.flatrate?.map(el => (
                            <ExternalElm imageUrl={el.logo_path}></ExternalElm>
                          ))}
                        </MediaSectionInfoExternalList>
                      </>
                    )}

                    {/* Rent */}
                    {movieWatchProviders?.rent?.length > 0 && (
                      <>
                        <Montserrat className="title-media-section-info-external" type="small" configuration={{fontWeight: 600, lineHeight: '13px', letterSpacing: '3px'}}>
                          <FormattedMessage defaultMessage={"mediaSectionInfoExternalWatchRent"} id={"mediaSectionInfoExternalWatchRent"} />
                        </Montserrat>
                        <MediaSectionInfoExternalList>
                          {movieWatchProviders?.rent?.map(el => (
                            <ExternalElm imageUrl={el.logo_path}></ExternalElm>
                          ))}
                        </MediaSectionInfoExternalList>
                      </>
                    )}

                    {/* Buy */}
                    {movieWatchProviders?.buy?.length > 0 && (
                      <>
                        <Montserrat className="title-media-section-info-external" type="small" configuration={{fontWeight: 600, lineHeight: '13px', letterSpacing: '3px'}}>
                          <FormattedMessage defaultMessage={"mediaSectionInfoExternalWatchBuy"} id={"mediaSectionInfoExternalWatchBuy"} />
                        </Montserrat>
                        <MediaSectionInfoExternalList>
                          {movieWatchProviders?.buy?.map(el => (
                            <ExternalElm imageUrl={el.logo_path}></ExternalElm>
                          ))}
                        </MediaSectionInfoExternalList>
                      </>
                    )}
                  </MediaSectionInfoExternalToWatch>
                </MediaSectionInfoExternalLeft>
              )}
              {socialLinks?.length > 0 && (
                <MediaSectionInfoExternalRight>
                  <MediaSectionInfoTitle>
                    <Icon
                      className="icon-media-info-title"
                      fill={theme.colors.element.dark}
                      strokeWidth={0}
                      width="20px"
                      height="20px"
                    >
                      <LinkIcon />
                    </Icon>
                    <Montserrat configuration={{color: theme.colors.element.dark, fontWeight: 600}}><FormattedMessage defaultMessage={"mediaSectionInfoLink"} id={"mediaSectionInfoLink"} /></Montserrat>
                  </MediaSectionInfoTitle>
                  <LinkSocialWrapper>
                    {socialLinks.map((link) => {
                      if (link?.url?.length > 0 && link?.social_id) {
                        return (
                          <LinkSocial href={link?.url} alt={link?.title} target="_blank">
                            <Icon
                              className="icon"
                              stroke="transparent"
                              fill={theme.colors.element.dark}
                              width="24px"
                              height="24px"
                            >
                              <Image 
                                className="icon"
                                src={link?.icon} 
                                width="24px !important"
                                height="24px !important"
                                layout="fixed" 
                              />
                            </Icon>
                          </LinkSocial>
                        )
                      }
                    })}
                  </LinkSocialWrapper>
                </MediaSectionInfoExternalRight>
              )}
            </MediaSectionInfoExternal>

          </MediaSectionInfo>
        </MediaSection>
      )}

      {Object.entries(movieCollection)?.length > 0 && (
        <CollectionSection imageBg={movieCollection?.backdrop_path}>
          <CollectionInfo>
            <CollectionInfoTop>
              <Montserrat type="h3" configuration={{fontWeight: 600}}>
                <FormattedMessage defaultMessage={"collectionInfoTitle"} id={"collectionInfoTitle"} />{" "}
              </Montserrat>
              <Montserrat className="collection-title" configuration={{fontSize: isTablet ? 20 : 24}}>
                {`${movieCollection?.name} (${movieCollection?.parts?.length})`}
              </Montserrat>
            </CollectionInfoTop>     
            <CollectionInfoBottom>
              <Button
                className="collection-action-btn"
                handleOnClick={() => router.push(`collection/${textToPath(movieCollection.name)}?id=${movieCollection.id}`)}
                active
                url={`collection/${textToPath(movieCollection.name)}?id=${movieCollection.id}`}
                text="collectionInfoAction"
              >
                <Icon
                  width="17px"
                  height="17px"
                  fill={theme.colors.element.light}
                  stroke="transparent"
                >
                  <EyeIcon />
                </Icon>
              </Button>
            </CollectionInfoBottom>   
          </CollectionInfo>
          <CollectionList>
            {movieCollection?.parts?.slice(0, 3).map(movie => (
              <CollectionPart 
                imgPoster={movie?.poster_path}
                onClick={() => router.push(`/movie/${textToPath(movie?.title)}/?id=${movie?.id}`)}
              >
              </CollectionPart>
            ))}
          </CollectionList>
        </CollectionSection>
      )}

      {movieRecommendation?.total_results > 0 && (
        <RecommendationsSection>
          <RowCard 
            listProducts={movieRecommendation?.results.slice(0, 4)}
            type="default"
            title="sectionTitleRecommendations"
            productType="productTypeFilm"
            goToText="goToRecommendations"
            totalList={movieRecommendation?.total_results}
          />
        </RecommendationsSection>
      )}
        
      <FullScreenPanel list={movieImages?.all} />
    </ProductDetailsContainer>
  );
}
