import Component from '../component';
import filmTemplate from './film.html';
import filmStyle from './film.pcss';

export default class Film extends Component {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    Component.addTemplateToDocument('film-template', filmTemplate, filmStyle);
    this.appendTemplateContentToRoot('film-template');

    this.addShadowEventListener('i', 'click', this.del);
    this.addShadowEventListener('data-bind-title', 'click', this.select);

    this.bindPropertiesToElements([
      'id',
      'title',
      'rating']);
  }

  del() {
    this.dispatchEvent(new Event('deleteFilm', { bubbles: true, composed: true }));
  }

  select() {
    this.dispatchEvent(new Event('selectFilm', { bubbles: true, composed: true }));
  }
}
