import { Image } from "./atoms";
import { AtSymbolIcon, EyeIcon, FilmIcon, HeartIcon, HomeIcon, InformationCircleIcon, TrendingUpIcon } from "@heroicons/react/solid";
import AperitifBottleDisable from "./assets/icons/aperitif-bottle-disable.png"
import AperitifBottleActive from "./assets/icons/aperitif-bottle-active.png"

export const primaryRoutes = [
  {
    to: "/",
    title: 'menuLinkTitleDiscover',
    icon: <HomeIcon />
  },
  {
    to: "/trending",
    title: 'menuLinkTitleTrending',
    icon: <TrendingUpIcon />
  }
];

export const userRoutes = [
  {
    to: "/user/favorite",
    title: 'menuLinkTitleFavorite',
    icon: <HeartIcon />
  },
  {
    to: "/user/vote",
    title: 'menuLinkTitleVoted',
    icon: (<><Image
            alt="icon-vote" 
            className="icon-image--disable"
            src={AperitifBottleDisable.src} 
            width="9px !important"
            height="20px !important"
            layout="fixed" 
          />
          <Image 
            alt="icon-vote"
            className="icon-image--active"
            src={AperitifBottleActive.src} 
            width="9px !important"
            height="20px !important"
            layout="fixed" 
          /></>)
  },
  {
    to: "/user/watch",
    title: 'menuLinkTitleToWatch',
    icon: <EyeIcon />
  },
  {
    to: "/user/experience",
    title: 'menuLinkTitleExperience',
    icon: <FilmIcon />
  },
];

export const infoRoutes = [
  {
    to: "/how-it-works",
    title: 'menuLinkTitleHowItWorks',
    icon: <InformationCircleIcon />
  },
  {
    to: "/about-us",
    title: 'menuLinkTitleAboutUs',
    icon: <AtSymbolIcon />
  },
];