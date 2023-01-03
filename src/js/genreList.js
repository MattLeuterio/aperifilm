import { connect } from "react-redux";

export const genresList = [
  {
    "id": 28,
    "en": "Action",
    "it": "Azione"
  },
  {
    "id": 12,
    "en": "Adventure",
    "it": "Avventura"
  },
  {
    "id": 16,
    "en": "Animation",
    "it": "Animazione"
  },
  {
    "id": 35,
    "en": "Comedy",
    "it": "Commedia"
  },
  {
    "id": 80,
    "en": "Crime",
    "it": "Crime"
  },
  {
    "id": 99,
    "en": "Documentary",
    "it": "Documentario"
  },
  {
    "id": 18,
    "en": "Drama",
    "it": "Drammatico"
  },
  {
    "id": 10751,
    "en": "Family",
    "it": "Famiglia"
  },
  {
    "id": 14,
    "en": "Fantasy",
    "it": "Fantasy"
  },
  {
    "id": 36,
    "en": "History",
    "it": "Storia"
  },
  {
    "id": 27,
    "en": "Horror",
    "it": "Horror"
  },
  {
    "id": 10402,
    "en": "Music",
    "it": "Musica"
  },
  {
    "id": 9648,
    "en": "Mystery",
    "it": "Mistero"
  },
  {
    "id": 10749,
    "en": "Romance",
    "it": "Romanzo"
  },
  {
    "id": 878,
    "en": "Science Fiction",
    "it": "Scientifico"
  },
  {
    "id": 10770,
    "en": "TV Movie",
    "it": "Film Televisivo"
  },
  {
    "id": 53,
    "en": "Thriller",
    "it": "Thriller"
  },
  {
    "id": 10752,
    "en": "War",
    "it": "Guerra"
  },
  {
    "id": 37,
    "en": "Western",
    "it": "Western"
  },
  {
    "id": 10765,
    "en": "Sci-Fi & Fantasy",
    "it": "Sci-Fi & Fantasy"
  }
];

export const searchGenre = (id, lang) => {
  const genre = genresList.filter(product => product.id === id?.id || product.id === id);
  if (lang === 'it') return genre[0]?.it;
  else return genre[0]?.en;
}