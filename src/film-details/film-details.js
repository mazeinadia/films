import Component from '../component';
import FilmList from '../film-list/film-list';

const dependencies = {};

export default class Film extends Component {
  static get templateService() {
    return dependencies.templateService;
  }

  static set templateService(dependency) {
    dependencies.templateService = dependency;
  }

  static get filmService() {
    return dependencies.filmService;
  }

  static set filmService(dependency) {
    dependencies.filmService = dependency;
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    Film.templateService.appendTemplateContentToRoot('film-details-template', root);


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
    FilmList.filmService.getFilm(this.id).then((response) => {

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
