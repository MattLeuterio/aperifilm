import { DateTime } from "luxon";
import PlaceholderPeopleMale from '../assets/images/placeholder-people-male.png';
import PlaceholderPeopleFemale from '../assets/images/placeholder-people-female.png';

export const tmdbApiKey = 'e2330ecaa641a077ab62520c44ab636f';

export const roundVote = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const pTypeConverter = (type) => {
  if (type === 'film' || type === 'productTypeFilm') return 'movie';
  if (type === 'tv-series' || type === 'productTypeTvSeries') return 'tv';
}
export const langConverter = (lang) => {
  if (lang === 'it' ) return 'it-IT';
  return 'en-EN';
}
export const parseContext = (context) => JSON.parse(JSON.stringify(context));

export const formatDate = (date, locale) => DateTime.fromISO(date).setLocale(locale).toLocaleString();

export const textToPath = (text) => text?.replaceAll('-', '').replaceAll(' ', '-').replaceAll('.', '').replaceAll(':', '').replaceAll('--', '-').toLowerCase();

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
      return 'tvSeriesTypeVideo';
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
      return 'tvSeriesTypeVideo';
  }
}