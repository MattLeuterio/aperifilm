import { DateTime } from "luxon";
import PlaceholderPeopleMale from '../assets/images/placeholder-people-male.png';
import PlaceholderPeopleFemale from '../assets/images/placeholder-people-female.png';
import PlaceholderNoImage from '../assets/images/placeholder-no-image.png';
import currencyCountries from '../js/currencyCountries.json'


export const tmdbApiKey = 'e2330ecaa641a077ab62520c44ab636f';
export const imgBasePath = 'https://image.tmdb.org/t/p/original';
export const siteBasePath = `http://localhost:3000`;
export const loginPath = '/api/auth/login';
export const logoutPath = '/api/auth/logout';

export const roundVote = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const pTypeConverter = (type) => {
  if (type === 'film' || type === 'productTypeFilm') return 'movie';
  if (type === 'tv-series' || type === 'productTypeTvSeries' || type === 'tv') return 'tv';
  if (type === 'collection' || type === 'productTypeCollection') return 'collection';
}

export const pTypeConverterLang = (type) => {
  if (type === 'tv') return 'productTypeTvSeries';
  if (type === 'collection') return 'productTypeCollection';
  if (type === 'movie') return 'productTypeFilm';
  if (type === 'person') return 'productTypePerson';
}

export const langConverter = (lang) => {
  if (lang === 'it' ) return 'it-IT';
  return 'en-EN';
}
export const parseContext = (context) => JSON.parse(JSON.stringify(context));

export const formatDate = (date, locale) => DateTime.fromISO(date).setLocale(locale).toLocaleString();

export const textToPath = (text) => {
  if (typeof text === 'string') {
    return text?.replace(/-/g, '').replace(/ /g, '-').replace(/"."/g, '').replace(/:/g, '').replace(/--/g, '-').toLowerCase()
  };
};

export const genderPlaceholder = (gender) => {
  if (gender === 1) return PlaceholderPeopleFemale.src;
  return PlaceholderPeopleMale.src;
}

export const getTvSeriesType = (type) => {
  switch (type) {
    case "Documentary":
      return 'tvSeriesTypeDocumentary'
      break;
    case "News":
      return 'tvSeriesTypeNews'
      break;
    case "Reality":
      return 'tvSeriesTypeDocumentary'
      break;
    case "Miniseries":
      return 'tvSeriesTypeMiniseries'
      break;
    case "Scripted":
      return 'tvSeriesTypeScripted'
      break;
    case "TalkShow":
      return 'tvSeriesTypeTalkShow'
      break;
    case "Video":
      return 'tvSeriesTypeVideo'
      break;
    
    default:
      return `${type}`;
  }
}

export const getTvSeriesStatus = (status) => {
  switch (status) {
    case "Pilot":
      return 'tvSeriesStatusPilot'
      break;
    case "In Production":
      return 'tvSeriesStatusInProduction'
      break;
    case "Returning Series":
      return 'tvSeriesStatusReturningSeries'
      break;
    case "Cancelled":
      return 'tvSeriesStatusCancelled'
      break;
    case "Ended":
      return 'tvSeriesStatusEnded'
      break;
    
    default:
      return `${status}`;
  }
}

export const getDepartmentPeople = (department) => {
  switch (department) {
    case "Writing":
      return 'peopleDepartmentWriting'
      break;
    case "Acting":
      return 'peopleDepartmentActing'
      break;
    case "Editing":
      return 'peopleDepartmentEditing'
      break;
    
    default:
      return `${department}`;
  }
}

export const sortByDate = (propertyName) => (a, b) =>
a[propertyName] > b[propertyName] ? -1 : a[propertyName] < b[propertyName] ? 1 : 0;

export const checkImage = (image) => {
  if (image) return `https://image.tmdb.org/t/p/original/${image}`
  return PlaceholderNoImage.src
}

export const addZeroToNum = (num) => {
  if (Number(num) < 10) return `0${num}`
  return `${num}`
}

export const searchPeopleRoleCrew = (list, role) => {

  if (role.toLowerCase() === 'writer') {
    const writer = list?.filter(el => el.job.toLowerCase() === role.toLowerCase());
    const screenplay = list?.filter(el => el.job.toLowerCase() === 'screenplay');
    if (screenplay, writer) {
      return [...writer, ...screenplay];
    }
  }
  
  return list?.filter(el => el.job.toLowerCase() === role.toLowerCase());
}

export const wasItVoted = (id, list) => {  
  const voted = list?.filter(el => el.id === id).user_vote;
  if (voted) return voted;
}

export const wasItAddedOnExperience = (id, list) => {  
  const experience = list?.filter(el => el.id === id).experience;
  if (experience) return experience;
}

export const selectTypeOptions = [
  {
    value: 'film-tv',
    label: 'yourListsSelectTypeFilmTv'
  },
  {
    value: 'film',
    label: 'yourListsSelectTypeFilm'
  },
  {
    value: 'tv',
    label: 'yourListsSelectTypeTv'
  },
  {
    value: 'person',
    label: 'yourListsSelectTypePeople'
  },
  {
    value: 'collection',
    label: 'yourListsSelectTypeCollections'
  }
]


export const currency = (value, country) => {
  console.log('qui', value, country)

  if (value && country) {
    const selectedCountry = currencyCountries.filter(c => c.CountryCode === country)[0];
    const resultd = (value)?.toLocaleString(selectedCountry?.CountryCode, { 
      style: 'currency', 
      currency: selectedCountry?.Code
    });
    return resultd
  }

  return undefined;
}