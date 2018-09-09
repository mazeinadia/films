import './index.pcss';

import Film from './film/film';
import filmTemplate from './film/film.html';
import filmStyle from './film/film.pcss';

import { Rating } from './raiting/rating';
import ratingTemplate from './raiting/rating.html';
import ratingStyle from './raiting/rating.pcss';

import FilmList from './film-list/film-list';
import filmListTemplate from './film-list/film-list.html';
import filmListStyle from './film-list/film-list.pcss';

import FilmDetails from './film-details/film-details';
import filmDetailsTemplate from './film-details/film-details.html';
import filmDetailsStyle from './film-details/film-details.pcss';

import AddFilm from './add-film/add-film';
import addFilmTemplate from './add-film/add-film.html';
import addFilmStyle from './add-film/add-film.pcss';

import TemplateService from './templateService';

import FilmService from './api/filmService';

const templateService = new TemplateService('templates');
const filmService = new FilmService('http://127.0.0.1:3000');

templateService.addTemplateToDocument('rating-template', ratingTemplate, ratingStyle);
Rating.templateService = templateService;
customElements.define('fl-rating', Rating);

templateService.addTemplateToDocument('film-template', filmTemplate, filmStyle);
Film.templateService = templateService;
customElements.define('fl-film', Film);

templateService.addTemplateToDocument('film-list-template', filmListTemplate, filmListStyle);
FilmList.templateService = templateService;
FilmList.filmService = filmService;
customElements.define('fl-film-list', FilmList);

templateService.addTemplateToDocument('film-details-template', filmDetailsTemplate, filmDetailsStyle);
FilmDetails.templateService = templateService;
FilmDetails.filmService = filmService;
customElements.define('fl-film-details', FilmDetails);

templateService.addTemplateToDocument('add-film-template', addFilmTemplate, addFilmStyle);
AddFilm.templateService = templateService;
AddFilm.filmService = filmService;
customElements.define('fl-add-film', AddFilm);
