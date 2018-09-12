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

  checkRating(event) {
    const tryToPrint = event.target.value;
    let newVal;
    if (isNaN(parseFloat(tryToPrint)) || parseFloat(tryToPrint) < 0) {
      newVal = 0;
    } else if ((parseFloat(tryToPrint)) > 10) {
      newVal = 10;
    } else {
      newVal = parseFloat(tryToPrint);
    }
    this.$('#rating').value = newVal;
  }

  save() {
    const filmData = {
      title: this.$('#title').value,
      description: this.$('#description').value,
      rating: this.$('#rating').value,
    };
    this.updating ? AddFilm.filmService.updateFilm(this.id, filmData).then(() => window.location.href = '/films')
      : AddFilm.filmService.addFilm(filmData).then(() => window.location.href = '/films');
  }
}
