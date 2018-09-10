import Component from '../component';
import filmDetailsTemplate from './film-details.html';
import filmDetailsStyle from './film-details.pcss';

const dependencies = {};

export default class FilmDetail extends Component {
  static get filmService() {
    return dependencies.filmService;
  }

  static set filmService(dependency) {
    dependencies.filmService = dependency;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    Component.addTemplateToDocument('film-details-template', filmDetailsTemplate, filmDetailsStyle);
    this.appendTemplateContentToRoot('film-details-template');

    this.bindPropertiesToAttributes([
      'id',
      'title',
      'rating',
      'description',
      'poster'
    ]);
  }

  static get attributeChangedCallback() {
    return [
      'id',
      'title',
      'rating',
      'poster',
      'descriprion'
    ]
  }

  connectedCallback() {
    this.renderContent();
  }

  renderContent() {
    FilmDetail.filmService.getFilm(this.id).then((response) => {
      this.$('#title').append(response.title);
      this.$('#description').append(response.description || 'Нет описания');
      this.$('#rating').append(response.rating);
      const poster = document.createElement('img');
      poster.src = response.cover_url === null
        ? "https://res.cloudinary.com/dcnr71p42/image/upload/v1536490419/star.png"
        : response.cover_url;
      this.$('#poster').append(poster);
    });
  }
}
