import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { Container, MediaSectionImage, ProductDetailsContainer, ResultsContainer } from "../../../src/styles/Pages/mediaDetailsStyle";
import { useEffect, useState } from "react";
import useMediaQuery from "../../../src/hooks/useMediaQuery";
import { TitlePage } from "../../../src/atoms";
import Router, { useRouter } from "next/router";
import { imgBasePath, langConverter, parseContext, tmdbApiKey } from "../../../src/js/utility";
import Tabs from "../../../src/atoms/Tabs";
import { Card, FullScreenPanel } from "../../../src/components";
import { setFullscreenPanel } from "../../../src/store/actions/appAction";

const mediaTabsList = [
	{
		id: 'backgrounds',
		label: 'tabMediaTitleBackgrounds',
		icon: null
	},
	{
		id: 'posters',
		label: 'tabMediaTitlePosters',
		icon: null
	}
]

export async function getServerSideProps(context) {
  try {
    const query = parseContext(context.query);
    const resolvedUrl = parseContext(context.resolvedUrl).split('/')[1]
    const resCredits = await fetch(`https://api.themoviedb.org/3/${resolvedUrl}/${query.id}/images?api_key=${tmdbApiKey}`);
    const creditsDetails = await resCredits.json();
    const resProductDetails = await fetch(`https://api.themoviedb.org/3/${resolvedUrl}/${query.id}?api_key=${tmdbApiKey}`);
    const productDetails = await resProductDetails.json();
    return {
      props: {
        creditsDetails,
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

export default function ProductDetailsMovie({creditsDetails, productDetails, productTypeContext, query}) {
  const tabs = mediaTabsList;
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { slug, id: pid } = router.query;
  const [mediaDetailsState, setMediaDetailsState] = useState({});
  const [productDetailsState, setProductDetailsState] = useState({});
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const user = useSelector((state) => state.userData);
  const userLanguageState = useSelector((state) => state.userData.language);

  const isTablet = useMediaQuery(769);
  const isMobile = !useMediaQuery(426);

  useEffect(() => {
    setMediaDetailsState(creditsDetails);
  }, [creditsDetails]);

  const getDetailsProduct = async () => {

    if (userLanguageState && creditsDetails) {
      const details = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}?api_key=${tmdbApiKey}&language=${langConverter(userLanguageState)}`
        ).then(res => res.json());

      const images = await fetch(
        `https://api.themoviedb.org/3/${productTypeContext}/${query.id}/images?api_key=${tmdbApiKey}`
        ).then(res => res.json());

      
      setMediaDetailsState(
        {
          backgrounds: [...images?.backdrops],
          posters: [...images?.posters]
        }
      );
      setProductDetailsState(details);
    }
  };

  useEffect(() => {
    getDetailsProduct();
  }, [userLanguageState, creditsDetails, productDetails]);

  const onChangeTab = tab => {
    setActiveTab(tab);
  };

  const handleOnClickImage = (index, isOpen) => {
    dispatch(setFullscreenPanel({isOpen, selected: index}));
  }

  return (
    <ProductDetailsContainer>
      <Head>
        <title>Media {productDetailsState?.title}  | Aperifilm</title>
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

      <TitlePage primaryTitle="pageTitleMedia" title={productDetailsState?.title} hasBackButton />

      <Container>
        <Tabs
          className="tabs" 
          selected={activeTab}
          onChange={onChangeTab}
          tabsList={tabs} 
        />
      </Container>

      <ResultsContainer>
        {
            <>
              {mediaDetailsState[activeTab.id]?.map((item, index) => (
                <MediaSectionImage
                  version={activeTab.id}
                  onClick={() => handleOnClickImage(index, true)}
                  name={`${productDetailsState?.title} image ${index}`}
                  srcImages={`${imgBasePath}/${item?.file_path}`}
                ></MediaSectionImage>
              ))}
            </>
        }
      </ResultsContainer>
  
      <FullScreenPanel list={mediaDetailsState[activeTab.id]} />
    </ProductDetailsContainer>
  );
}
