/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {CustomMessage, CustomSelect, Icon, Tabs, TitlePage } from "../../src/atoms";
import { Card, Experience } from "../../src/components";
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { imgBasePath, parseContext, pTypeConverterLang, selectTypeOptions } from "../../src/js/utility";
import { Main, PageMainContainer, ResultsContainer, SearchContainer, SearchInput, FiltersContainer, TabsContainer, UserListsContainer, ExperienceContainer } from "../../src/styles/Pages/userListsStyle";
import theme from "../../src/theme";
import en from "../../lang/en.json";
import it from "../../lang/it.json";
import useMediaQuery from "../../src/hooks/useMediaQuery";
import { useUser } from "@auth0/nextjs-auth0";

const initialFilters = {
  type: 'film-tv',
}

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    
    return {
      props: {
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

export default function UserLists({query}) {
  const userLanguageState = useSelector((state) => state.userData?.language);
  const userListProductsState = useSelector((state) => state.userData?.list_products[0]);

  const isMobile = useMediaQuery(426);
  const isTablet = useMediaQuery(769);

  const tabsListDefault = [
    {
      id: 'favorite',
      label: 'menuLinkTitleFavorite',
      number: null
    },
    {
      id: 'vote',
      label: 'menuLinkTitleVoted',
      number: null
    },
    {
      id: 'watch',
      label: 'menuLinkTitleToWatch',
      number: null
    },
    {
      id: 'experience',
      label: 'menuLinkTitleExperience',
      number: null
    },
  ]

  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [tabsList, setTabsList] = useState(tabsListDefault);
  const [userProductsList, setUserProductsList] = useState({});
  const [resultsList, setResultsList] = useState([]);
  const [queryType, setQueryType] = useState('favorite');
  const [activeTab, setActiveTab] = useState(tabsList[0]);
  const [userLanguage, setUserLanguage] = useState(router.locale);
  const [filters, setFilters] = useState(initialFilters);
  const [filteredList, setFilteredList] = useState(resultsList);
  const [valueSearch, setValueSearch] = useState("");
  const [experienceOpened, setExperienceOpened] = useState();

  useEffect(() => {
    if (!user) Router.push('/');
  }, [user])

	const handleOnChange = (value) => {
    setValueSearch(value);
    if (valueSearch.length >= 2) {
      const regex = new RegExp(value, "gi");
			const filt = filteredList.filter(p=>p[userLanguage].title.match(regex));
      setFilteredList(filt);
    } else {
      filtByType();
		}
  };

  const onCloseValueSearch = () => {
    setValueSearch('');
    filtByType();
  };

  // Select Type
  let selectTypeOptionsLang = activeTab?.id === 'favorite' ? (
    selectTypeOptions.reduce((acc, el) => {
      return [
        ...acc,
        {
          value: String(el.value),
          label: userLanguage === 'en' ? en[el.label] : it[el.label]
        }
      ]
    }, [])
  ) : (
    selectTypeOptions.filter(el => el.value !== 'collection').filter(el => el.value !== 'person').reduce((acc, el) => {
      return [
        ...acc,
        {
          value: String(el.value),
          label: userLanguage === 'en' ? en[el.label] : it[el.label]
        }
      ]
    }, [])
  );
      
  const [valueSelectType, setValueSelectType] = useState(selectTypeOptionsLang[0]);

  useEffect(() => {
    setQueryType(query.slug);
  }, [query])

  useEffect(() => {
    setUserProductsList(userListProductsState?.lists);
    setExperienceOpened(userListProductsState?.lists?.experience[0].id);
  }, [userListProductsState])

  useEffect(() => {
    setActiveTab(tabsListDefault.filter(el => el.id === queryType)[0]);
  }, [queryType])

  useEffect(() => {setUserLanguage(userLanguageState)}, [userLanguageState])
  
  useEffect(() => {
    setTabsList([
      {
        id: 'favorite',
        label: 'menuLinkTitleFavorite',
        number: userProductsList?.favorite?.length
      },
      {
        id: 'vote',
        label: 'menuLinkTitleVoted',
        number: userProductsList?.vote?.length
      },
      {
        id: 'watch',
        label: 'menuLinkTitleToWatch',
        number: userProductsList?.watch?.length
      },
      {
        id: 'experience',
        label: 'menuLinkTitleExperience',
        number: userProductsList?.experience?.length
      },
    ])

    if (Boolean(userProductsList) && userProductsList[activeTab?.id]?.filter(el=> el.product_type === 'movie').length <= 0) {
      selectTypeOptionsLang = selectTypeOptionsLang?.filter(s=>s.value !== 'film');
    }

    setValueSelectType(selectTypeOptionsLang[0])
    setFilters(initialFilters)
    onCloseValueSearch();
    if (Boolean(userLanguage) && Boolean(activeTab?.id) && Boolean(userProductsList)) {
      setResultsList(userProductsList[activeTab?.id])
    }
  }, [userLanguage, userProductsList, queryType, activeTab]);

  const onChangeTab = tab => {
    setActiveTab(tab);
    router.push(`/user/${tab.id}`);
  };  

  const handleOnChangeType = (selected) => {
		setValueSelectType(selected);
    setFilters({...filters, type: selected.value})
	}

  useEffect(() => {
    setFilteredList(resultsList)
  }, [resultsList])

  const filtByType = () => {
    if (filters.type === 'film-tv') {
      const filt = resultsList?.filter(el => (el.product_type === 'movie' || el.product_type === 'tv'));
      setFilteredList(filt);
    }
    if (filters.type === 'film') {
      const filt = resultsList?.filter(el => el.product_type === 'movie');
      setFilteredList(filt);
    }
    if (filters.type === 'tv') {
      const filt = resultsList?.filter(el => el.product_type === 'tv');
      setFilteredList(filt);
    }
    if (filters.type === 'person') {
      const filt = resultsList?.filter(el => el.product_type === 'person');
      setFilteredList(filt);
    }
    if (filters.type === 'collection') {
      const filt = resultsList?.filter(el => el.product_type === 'collection');
      setFilteredList(filt);
    }
  }
  useEffect(() => {
    onCloseValueSearch();
  }, [filters, valueSelectType, activeTab])

  if (user) {
    return (
      <UserListsContainer>
        <Head>
          <title>Your Lists | Aperifilm</title>
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
  
        <TitlePage primaryTitle="sidebarYourListTitle" title={isTablet ? activeTab?.label : null} />
  
        {!isTablet && (
          <TabsContainer>
            <Tabs
              sizeButtons="large"
              selected={activeTab}
              onChange={onChangeTab}
              tabsList={tabsList}
            />
          </TabsContainer>
        )}
        <PageMainContainer>
          <Main>
            <FiltersContainer>
              <CustomSelect
                width={isMobile ? "100%" : "160px"}
                defaultValue={valueSelectType}
                value={valueSelectType}
                onChange={(value) => handleOnChangeType(value)}
                name="color"
                options={selectTypeOptionsLang}
              />
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder={userLanguage === 'en' ? en["yourListSearchPlaceholder"] : it["yourListSearchPlaceholder"]}
                  value={valueSearch}
                  onChange={(e) => handleOnChange(e.target.value)}
                  maxlength="10"
                />
                <Icon
                  className="icn-search"
                  size="20px"
                  fill={theme.colors.element.dark}
                  strokeWidth="0px"
                  >
                    {valueSearch.length ? (
                      <XIcon
                        onClick={() => onCloseValueSearch()}
                      />
                    ) : (
                      <SearchIcon
                        onClick={(e) => handleOnClickSearchIcon(e)}
                      />
                    )}
                </Icon>
              </SearchContainer>
            </FiltersContainer>
            <ResultsContainer>
              {filteredList?.length > 0 ? filteredList?.map((prod) => {
                if (prod?.experience) {
                  return (
                    <ExperienceContainer onClick={() => setExperienceOpened(prod?.id)} isOpen={experienceOpened === prod?.id}>
                      <Experience 
                        title={prod[userLanguageState]?.title || prod[userLanguageState]?.name} product={prod?.en || prod?.it} 
                        background={prod[userLanguageState]?.backdrop_path ? `${imgBasePath}/${prod[userLanguageState]?.backdrop_path}` : null }
                        />
                    </ExperienceContainer>
                  )

                } else {
                  return (
                    <Card key={prod?.id} product={prod[userLanguage]} type={prod.product_type} productType={pTypeConverterLang(prod.product_type)} className="card" />
                  )
                }
              }) : (
                <CustomMessage text={"yourListMessageNoContent"} />
              )}
            </ResultsContainer>
          </Main>
        </PageMainContainer>
      </UserListsContainer>
    );
  }
}
