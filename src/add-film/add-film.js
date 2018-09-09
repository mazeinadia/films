import Component from '../component';

const dependencies = {};

export default class AddFilm extends Component {
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
    AddFilm.templateService.appendTemplateContentToRoot('add-film-template', root);
    this.addShadowEventListener('a', 'click', this.save);

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
  }
}
