import './index.pcss';

import Film from './film/film';
import Rating from './raiting/rating';
import FilmList from './film-list/film-list';
import FilmDetails from './film-details/film-details';
import AddFilm from './add-film/add-film';
import FilmService from './api/filmService';

export default function createElements() {
  const filmService = new FilmService('https://xsolla-films-server.herokuapp.com');
  //const filmService = new FilmService('http://127.0.0.1:3000');

  customElements.define('fl-rating', Rating);

  customElements.define('fl-film', Film);

  FilmList.filmService = filmService;
  customElements.define('fl-film-list', FilmList);

  FilmDetails.filmService = filmService;
  customElements.define('fl-film-details', FilmDetails);

  AddFilm.filmService = filmService;
  customElements.define('fl-add-film', AddFilm);
}

createElements();
