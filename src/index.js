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

import Pagination from './pagination/pagination';
import paginationTemplate from './pagination/pagination.html';
import paginationStyle from './pagination/pagination.pcss'

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

templateService.addTemplateToDocument('pagination-template', paginationTemplate, paginationStyle);
Pagination.templateService = templateService;
customElements.define('fl-pagination', Pagination);

templateService.addTemplateToDocument('film-list-template', filmListTemplate, filmListStyle);
FilmList.templateService = templateService;
FilmList.filmService = filmService;
customElements.define('fl-film-list', FilmList);
