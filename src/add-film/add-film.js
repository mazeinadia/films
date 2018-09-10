import Component from '../component';
import addFilmTemplate from './add-film.html';
import addFilmStyle from './add-film.pcss';

const dependencies = {};

export default class AddFilm extends Component {
  static get filmService() {
    return dependencies.filmService;
  }

  static set filmService(dependency) {
    dependencies.filmService = dependency;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    Component.addTemplateToDocument('add-film-template', addFilmTemplate, addFilmStyle);
    this.appendTemplateContentToRoot('add-film-template');

    this.addShadowEventListener('#save', 'click', this.save);

    this.bindPropertiesToAttributes(['id', 'updating']);
  }

  connectedCallback() {
    if (this.id !== 'null') {
      this.updating = true;

      AddFilm.filmService.getFilm(this.id).then(
        (response) => {
          this.$('#title').value = response.title,
          this.$('#description').value = response.description,
          this.$('#rating').value = response.rating;
        },
      );
    }
  }

  save() {
    const filmData = {
      'title': this.$('#title').value,
      'description': this.$('#description').value,
      'rating': this.$('#rating').value,
    };
    this.updating ? AddFilm.filmService.updateFilm(this.id, filmData)
      : AddFilm.filmService.addFilm(filmData);
    window.location = '/films';
  }
}
