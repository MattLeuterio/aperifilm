import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Actions, Biography, ButtonImages, CastSection, Container, ContainerLeft, ContainerRight, ElementJob, ElementTitle, ElementYear, FilteringWrapper, LeftActions, LinkSocial, LinkSocialWrapper, ListProducts, ListProductsFooter, ListProductsHeader, ListProductsSection, ListProductsTable, PeopleCover, PeopleInfo, PeopleInfoElement, PersonDetailsContainer, PopularProject, PopularProjectsSection, ProductDetailsContainer, TableFooter, TableHeader, TableHeaderElement, TableResultElement, TableResults } from "../../src/styles/Pages/personDetailsStyle";
import { useEffect, useState } from "react";
import { ActionsProductButton, FullScreenPanel } from "../../src/components";
import useMediaQuery from "../../src/hooks/useMediaQuery";
import { CustomMessage, CustomSelect, Icon, Image, Tabs, TitlePage, WarningLanguage } from "../../src/atoms";
import Router, { useRouter } from "next/router";
import { formatDate, genderPlaceholder, getDepartmentPeople, langConverter, parseContext, sortByDate, textToPath, tmdbApiKey } from "../../src/js/utility";
import Montserrat from "../../src/typography/montserrat";
import theme from "../../src/theme";
import dynamic from 'next/dynamic'
import { setFullscreenPanel } from "../../src/store/actions/appAction";
import FacebookIcon from "../../src/assets/icons/logo-facebook.png";
import InstagramIcon from "../../src/assets/icons/logo-instagram.png";
import TwitterIcon from "../../src/assets/icons/logo-twitter.png";
import { CakeIcon, PhotographIcon, ShareIcon } from "@heroicons/react/solid";
import { profileHandler } from "@auth0/nextjs-auth0/dist/handlers";
import { defaultTabsList } from "../../src/atoms/Tabs";
import { DateTime } from "luxon";

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    const resolvedUrl = parseContext(context.resolvedUrl).split('/')[1]
    const res = await fetch(`https://api.themoviedb.org/3/${resolvedUrl}/${query.id}?api_key=${tmdbApiKey}`);
    const personDetails = await res.json();
    return {
      props: {
        personDetails,
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

export default function PeopleDetails({personDetails, productTypeContext, query}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const tabs = defaultTabsList;

  const selectSectorOptions = [
    {
      value: 'cast',
      label: 'Cast'
    },
    {
      value: 'crew',
      label: 'Crew'
    }
  ]
  
  const { slug, id: pid } = router.query
  const [personDetailsState, setPersonDetailsState] = useState({});
  const [personImages, setPersonImages] = useState({});
  const [personPopularProject, setPersonPopularProject] = useState([]);
  const [personMovieProject, setPersonMovieProject] = useState([]);
  const [personTvProject, setPersonTvProject] = useState([]);
  const [movieExternalIds, setMovieExternalIds] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [noBiography, setNoBiography] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [valueSelectSector, setValueSelectSector] = useState(selectSectorOptions[0]);
  const [tableResults, setTableResults] = useState([]);
  const [fullScreenIsOpen, setFullScreenIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

  useEffect(() => {
    setPersonDetailsState(personDetails);
  }, [personDetails]);

  useEffect(() => {
    getDetailsProduct();
  }, [userLanguageState, personDetails]);

  useEffect(() => {
    if (personDetailsState?.belongs_to_collection) {
      getCollection(personDetailsState?.belongs_to_collection?.id);
    }
  }, [userLanguageState, personDetailsState]);

  useEffect(() => {
    const type = activeTab.id;
    const sector = valueSelectSector.value;

    let movieFiltered = [];
    let tvFiltered = [];

    const movie = Object.entries(personMovieProject).reduce((acc, [key, val]) => {
      return [
        ...acc,
        {
          name: key,
          results: val
        }
      ]
    }, []);

    const tv = Object.entries(personTvProject).reduce((acc, [key, val]) => {
      return [
        ...acc,
        {
          name: key,
          results: val
        }
      ]
    }, []);

    if (type === 'movie') {
      const listMovie = movie?.filter(el => el.name === sector)[0]?.results;
      const orderedListMovie = listMovie?.sort(sortByDate('release_date'))

      orderedListMovie?.map(el => {
        if (!movieFiltered?.includes(String(el.id))) movieFiltered = [...movieFiltered, el];
      });

      setTableResults(movieFiltered);

    } else {

      const list = tv?.filter(el => el.name === sector)[0]?.results;
      const orderedList = list?.sort(sortByDate('first_air_date'));
    
      setTableResults(orderedList);
    }

    const arr = [{a: 'b'}]
    console.log(arr.some(item => item.a === 'b'))

  }, [activeTab, valueSelectSector, personDetailsState]);

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
  }, [movieExternalIds]);

  const getDetailsProduct = async () => {

    // TODO: delete
   //query.id = '616037' 

    // setIsLoaded(false);
    if (userLanguageState && personDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());

      const images = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/images?api_key=${tmdbApiKey}`
        ).then(res => res.json());

      const externalIds = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/external_ids?api_key=${tmdbApiKey}`
        ).then(res => res.json());

      const detailsWithBiography = {...details, biography: `${details?.biography?.length > 0 ? details?.biography : personDetails?.biography}`}
      
      if (userLanguageState === 'it' && details?.biography?.length <= 0) {setNoBiography(true)};

      const combinedCredits = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/combined_credits?api_key=${tmdbApiKey}`
        ).then(res => res.json());
        
      setPersonDetailsState(detailsWithBiography);
      setPersonImages(images);
      setPersonPopularProject([...combinedCredits?.cast, ...combinedCredits?.crew].sort((a, b) => b.popularity - a.popularity));
      setPersonMovieProject({cast: [...combinedCredits?.cast?.filter(el => el.media_type === 'movie')], crew: [...combinedCredits?.crew?.filter(el => el.media_type === 'movie')]});
      setPersonTvProject({cast: [...combinedCredits?.cast?.filter(el => el.media_type === 'tv')], crew: [...combinedCredits?.crew?.filter(el => el.media_type === 'tv')]});
      setMovieExternalIds(externalIds);
    }
  };

  const getCollection = async (id) => {
    const collection = await fetch(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
      ).then(res => res.json());

    setMovieCollection(collection);
  }

  const handleOnClickImage = (isOpen) => {
    dispatch(setFullscreenPanel({isOpen, selected: 0}));
  }

  const onChangeTab = tab => {
    setActiveTab(tab);
  };

  const handleOnChangeSector = (el) => {
		setValueSelectSector(el);
		//dispatch(setUserTranslate(el?.value));
	}

  console.log('DETAILS: ', personDetailsState);
  console.log('SOCIAL LINKS: ', socialLinks);
  console.log('IMAGES: ', personImages);
  console.log('POPULAR PROJECT: ', personPopularProject);
  console.log('MOVIE PROJECTS: ', personMovieProject);
  console.log('TV PROJECTS: ', personTvProject);
  console.log('************************************');
  console.log('VALUE TAB', activeTab);
  console.log('VALUE SELECT', valueSelectSector);
  console.log('TABLE LIST RES: ', tableResults);

  return (
    <PersonDetailsContainer>
      <Head>
        <title>{personDetailsState?.name} | Aperifilm</title>
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

      <TitlePage title={personDetailsState?.name} hasBackButton />
      
      <Container>
        <ContainerLeft>
          <PeopleCover>
            <Image alt={`${personDetailsState?.name} poster`} width="100%" height="100%" src={personDetailsState?.profile_path ? `https://image.tmdb.org/t/p/original/${personDetailsState?.profile_path}` : genderPlaceholder(personDetailsState?.gender)} />
            {personImages?.profiles?.length > 1 && (
              <ButtonImages
                onClick={() => handleOnClickImage(true)}
              >
                <Icon
                  className="icon-gallery"
                  width="18px"
                  height="18px"
                  fill={theme.colors.element.light}
                  stroke='transparent'
                >
                  <PhotographIcon />
                </Icon>
                <Montserrat type="small">
                  <FormattedMessage defaultMessage={"actionsOpenGalleryPeople"} id={"actionsOpenGalleryPeople"} />
                </Montserrat>
              </ButtonImages>
            )}
          </PeopleCover>
          <Actions>
            <LeftActions>
              <ActionsProductButton action="favorite"/>
              <Icon
                className="icon-share"
                fill={theme.colors.element.light}
                width="20px"
                height="20px"
                strokeWidth={0}
              >
                <ShareIcon />
              </Icon>
            </LeftActions>
            {socialLinks?.length > 0 && (
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
            )}
          </Actions>
          <PeopleInfo>
            {personDetailsState?.known_for_department && (
              <PeopleInfoElement>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"peopleInfoSector"} id={"peopleInfoSector"} />
                </Montserrat>
                <Montserrat className="info-crew-name">
                  <FormattedMessage defaultMessage={getDepartmentPeople(personDetailsState?.known_for_department)} id={getDepartmentPeople(personDetailsState?.known_for_department)} />
                </Montserrat>
              </PeopleInfoElement>
            )}
            {personDetailsState?.birthday && (
              <PeopleInfoElement>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"peopleInfoBirthday"} id={"peopleInfoBirthday"} />
                </Montserrat>
                <Montserrat className="info-crew-name">
                  {formatDate(personDetailsState?.birthday, userLanguageState)}
                </Montserrat>
              </PeopleInfoElement>
            )}
            {personDetailsState?.deathday && (
              <PeopleInfoElement>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"peopleInfoDeathday"} id={"peopleInfoDeathday"} />
                </Montserrat>
                <Montserrat className="info-crew-name">
                  {formatDate(personDetailsState?.deathday, userLanguageState)}
                </Montserrat>
              </PeopleInfoElement>
            )}
            {personDetailsState?.place_of_birth && (
              <PeopleInfoElement>
                <Montserrat type="productDetailsInfoCrewTitle">
                  <FormattedMessage defaultMessage={"peopleInfoBirthplace"} id={"peopleInfoBirthplace"} />
                </Montserrat>
                <Montserrat className="info-crew-name">
                  {personDetailsState?.place_of_birth}
                </Montserrat>
              </PeopleInfoElement>
            )}
          </PeopleInfo>
        </ContainerLeft>
        <ContainerRight>

          <Biography>
            {(noBiography && personDetailsState?.biography.length > 0) && (
              <CustomMessage text="Traduzione italiana mancante" />
            )}
            <Montserrat configuration={{lineHeight: '18px'}}>{personDetailsState?.biography}</Montserrat>
          </Biography>

          <Montserrat className="product-details-section-title" type="productDetailsSectionTitle" configuration={{fontSize: isTablet ? 20 : 24}}>
            <FormattedMessage defaultMessage={"sectionTitlePeoplePopularProject"} id={"sectionTitlePeoplePopularProject"} />{" "}
          </Montserrat>
          <PopularProjectsSection>
            {personPopularProject?.slice(0,4).map(proj => (
              <PopularProject
                onClick={() => Router.push(`/${proj.media_type}/${textToPath(proj?.name) || textToPath(proj?.title)}?id=${proj?.id}`)}
              >
                <Image className="popular-project-poster" alt={`${proj?.name || proj?.title} poster`} width="100%" height="100%" src={personDetailsState?.profile_path ? `https://image.tmdb.org/t/p/original/${proj.poster_path}` : genderPlaceholder(personDetailsState?.gender)} />
                <Montserrat configuration={{fontSize: 16, fontWeight: 600}}>{proj?.name || proj?.title}</Montserrat>
              </PopularProject>
            ))}
          </PopularProjectsSection>

          <ListProductsSection>
            <FilteringWrapper>
              <Tabs 
                selected={activeTab}
                onChange={onChangeTab}
                tabsList={tabs} 
              />
              <CustomSelect
                width="150px"
                defaultValue={valueSelectSector}
                onChange={(e) => handleOnChangeSector(e)}
                name="color"
                options={selectSectorOptions}
              />
            </FilteringWrapper>
              {tableResults?.length > 0 ? (
            <ListProductsTable>

              <TableHeader>
                <TableHeaderElement className="table-header-year">
                  <FormattedMessage defaultMessage={"peopleTableHeaderYear"} id={"peopleTableHeaderYear"} />
                </TableHeaderElement>
                <TableHeaderElement className="table-header-title">
                  <FormattedMessage defaultMessage={"peopleTableHeaderTitle"} id={"peopleTableHeaderTitle"} />
                </TableHeaderElement>
                <TableHeaderElement className="table-header-job">
                  <FormattedMessage defaultMessage={"peopleTableHeaderJob"} id={"peopleTableHeaderJob"} />
                </TableHeaderElement>
              </TableHeader>

                <TableResults>
                  {tableResults?.map(el => (
                    <TableResultElement>
                      <ElementYear>
                        {
                          activeTab?.id === 'movie' ? (
                            el?.release_date?.length > 0 ? DateTime.fromISO(el.release_date)?.toFormat('yyyy').toLocaleString() : '-'
                          ) : (
                            el?.first_air_date?.length > 0 ? DateTime.fromISO(el.first_air_date)?.toFormat('yyyy').toLocaleString() : '-'
                          )
                          
                        }
                      </ElementYear>
                      <ElementTitle>
                        {el?.title || el?.name}
                      </ElementTitle>
                      <ElementJob>
                        {
                          valueSelectSector.value === 'cast' ? (
                            <FormattedMessage defaultMessage={"peopleDepartmentActing"} id={"peopleDepartmentActing"} />
                            ) : getDepartmentPeople(el.job)
                        }
                      </ElementJob>
                    </TableResultElement>
                  ))}
                </TableResults>

              <TableFooter>
                <TableHeaderElement></TableHeaderElement>
              </TableFooter>

            </ListProductsTable>
              ) : (
                  <CustomMessage text="noResults" />
                )}
          </ListProductsSection>
        </ContainerRight>
      </Container>
      
      {personImages?.profiles?.length > 1 && (
        <FullScreenPanel list={personImages?.profiles} />
      )}
    </PersonDetailsContainer>
  );
}
