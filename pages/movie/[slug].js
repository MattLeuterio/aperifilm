import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { BackdropSection, CastSection, Header, HeaderCover, HeaderInfo, HeaderInfoCrew, HeaderInfoDatas, HeaderInfoDatasGenres, HeaderInfoDatasLeft, HeaderInfoDatasRight, HeaderInfoSummary, HeaderInfoVote, HeaderInfoVoteActions, HeaderInfoVoteActionsLeft, HeaderInfoVoteActionsRight, InfoCrew, InfoSection, InfoSectionElement, InfoSectionWrapperElement, MediaSection, MediaSectionGallery, MediaSectionGalleryHeader, MediaSectionGalleryImages, MediaSectionImage, MediaSectionInfo, MediaSectionInfoExternal, MediaSectionInfoExternalLeft, MediaSectionInfoExternalRight, MediaSectionInfoKeywords, ProductDetailsContainer, ReleaseDate, RowCards, Runtime, VideoAndInfoSection, VideoSection } from "../../src/styles/Pages/productDetailsStyle";
import { useEffect, useState } from "react";
import { FullScreenPanel, RowCard, WelcomeBanner } from "../../src/components";
import useMediaQuery from "../../src/hooks/useMediaQuery";
import { ActionButtons, Badge, GoTo, Icon, Image, RatingBottle, TitlePage } from "../../src/atoms";
import { useRouter } from "next/router";
import { formatDate, langConverter, parseContext, pTypeConverter, roundVote, textToPath, tmdbApiKey } from "../../src/js/utility";
import Montserrat from "../../src/typography/montserrat";
import { CalendarIcon, ClockIcon, ShareIcon } from "@heroicons/react/solid";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import theme from "../../src/theme";
import { DateTime } from "luxon";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { setFullscreenPanel } from "../../src/store/actions/appAction";
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
  
  const { slug, id: pid } = router.query
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [movieDetailsState, setMovieDetailsState] = useState({});
  const [movieCredits, setMovieCredits] = useState([]);
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
  const [fullScreenIsOpen, setFullScreenIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);

  useEffect(() => {
    setMovieDetailsState(movieDetails);
  }, [movieDetails]);

  const getDetailsProduct = async () => {
    // setIsLoaded(false);
    if (userLanguageState && movieDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());
  
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
        
      setMovieDetailsState(details);
      setMovieCredits(credits);
      setMovieVideo(video?.results?.filter(vid => vid.site === 'YouTube' && vid.type === 'Trailer').slice(0, 1));
      setMovieImages(setProductImages(images));
    }
  };

  const setProductImages = (images) => {
    let res = [];
    console.log('images', images)
    const backdrops = images?.backdrops;
    const posters = images?.posters;

    res = [...images?.backdrops, ...images?.posters]
    return {...images, all: res};
  }

  useEffect(() => {
    getDetailsProduct();
  }, [userLanguageState, movieDetails]);

  console.log('DETAILS: ', movieDetailsState);
  console.log('VIDEO: ', movieVideo);
  console.log('CREDITS: ', movieCredits);
  console.log('IMAGES: ', movieImages);

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
            <Montserrat configuration={{lineHeight: '18px'}}>{movieDetailsState?.overview}</Montserrat>
          </HeaderInfoSummary>
          <HeaderInfoCrew>
            {searchPeopleRoleCrew(movieCredits?.crew, 'director')?.length > 0 && (
              <InfoCrew>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"roleDirector"} id={"roleDirector"} />
                </Montserrat>
                {searchPeopleRoleCrew(movieCredits?.crew, 'director')?.map((p, index) => (
                  <Link key={index} href={`/people/${p.name}?id=${p.id}`}>
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
                  <Link key={index} href={`/people/${textToPath(p.name)}?id=${p.id}`}>
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
                  <Link key={index} href={`/people/${textToPath(p.name)}?id=${p.id}`}>
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
                  <Link key={index} href={`/people/${textToPath(p.name)}?id=${p.id}`}>
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
              {movieDetailsState.vote_count > 0 && (
                <HeaderInfoVote>
                  <Montserrat className="info-vote" type="productDetailsInfoCrewTitle">
                    <FormattedMessage defaultMessage={"averageVote"} id={"averageVote"} />
                  </Montserrat>
                  <RatingBottle vote={roundVote(movieDetailsState?.vote_average, 1)} />   
                </HeaderInfoVote>
              )}
              {movieDetailsState.vote_count > 0 && (
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
          <Image alt={`${movieDetailsState?.title} poster`} width="100%" height="100%" src={`https://image.tmdb.org/t/p/original/${movieDetailsState?.poster_path}`} />
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
        ) : (
          <BackdropSection url={movieDetailsState?.backdrop_path}></BackdropSection>
        )}
        <InfoSection>
          <Montserrat type="productDetailsSectionTitle">Info</Montserrat>
          <InfoSectionWrapperElement>
            <InfoSectionElement>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementOriginalTitle"} id={"infoSectionElementOriginalTitle"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState.original_title}</Montserrat>
            </InfoSectionElement>
            <InfoSectionElement>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementStatus"} id={"infoSectionElementStatus"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState.status}</Montserrat>
            </InfoSectionElement>
            <InfoSectionElement>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementBudget"} id={"infoSectionElementBudget"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState.budget}</Montserrat>
            </InfoSectionElement>
            <InfoSectionElement>
              <Montserrat type="h4" configuration={{fontWeight: 600, lineHeight: 2, color: theme.colors.element.dark}}>
                <FormattedMessage defaultMessage={"infoSectionElementRevenue"} id={"infoSectionElementRevenue"} />
              </Montserrat>
              <Montserrat type="h4">{movieDetailsState.revenue}</Montserrat>
            </InfoSectionElement>
          </InfoSectionWrapperElement>
        </InfoSection>
      </VideoAndInfoSection>

      <MediaSection>
        <MediaSectionGallery>
          <MediaSectionGalleryHeader>
            <Montserrat type="productDetailsSectionTitle">
              <FormattedMessage defaultMessage={"mediaSectionGalleryHeader"} id={"mediaSectionGalleryHeader"} />{" "}
              <Montserrat 
                htmlAttribute="span" type="productDetailsSectionTitle" configuration={{fontWeight: 400}}
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
          <MediaSectionInfoKeywords>

          </MediaSectionInfoKeywords>
          <MediaSectionInfoExternal>
            <MediaSectionInfoExternalLeft>
              
            </MediaSectionInfoExternalLeft>
            <MediaSectionInfoExternalRight>

            </MediaSectionInfoExternalRight>
          </MediaSectionInfoExternal>

        </MediaSectionInfo>
      </MediaSection>
        
      <FullScreenPanel list={movieImages?.all} />
    </ProductDetailsContainer>
  );
}
