import Component from '../component';

const dependencies = {};

export default class FilmList extends Component {
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

  get films() {
    return Array.from(this.shadowRoot.querySelectorAll('fl-films'));
  }

  get list() {
    return this.$('#list');
  }

  get currentPage() {
    return +this.getAttribute('current-page');
  }

  set currentPage(value) {
    value ? this.setAttribute('current-page', value) : this.removeAttribute('current-page');
  }

  get offset() {
    return (this.currentPage - 1) * this.records;
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    FilmList.templateService.appendTemplateContentToRoot('film-list-template', root);
    this.records = 10;
    this.currentPage = 1;
    this.addShadowEventListener('fl-film', 'selectFilm', this.select);
    this.addShadowEventListener('button', 'click', this.updateList);
    this.addShadowEventListener('fl-film', 'deleteFilm', this.deleteFilm);
    this.addShadowEventListener('#add', 'addFilm', this.openAddForm);
  }

  connectedCallback() {
    this.emptyList();
    this.renderList();
  }

  select() {
    //this.dispatchEvent(new Event('selectFilm', { bubbles: true, composed: true }));
  }

  deleteFilm(event) {
    const filmId = event.target.closest('fl-film').id;

    for (let i = 0; i < this.$$('fl-film').length; i++) {
      const film = this.$$('fl-film')[i];
      if (film.id === filmId) {
        this.list.removeChild(film);
        FilmList.filmService.deleteFilm(filmId);
      }
    }
  }

  openAddForm() {
    return true;
  }

  addFilm(filmData) {
      const Film = customElements.get('fl-film');
      const film = new Film();

      film.title = filmData.title;
      film.id = filmData.id;
      film.rating = filmData.rating;
      this.list.appendChild(film);
  }

  updateList() {
    this.currentPage += 1;
    this.renderList();
  }

  emptyList() {
    while (this.list.hasChildNodes()) {
      this.list.removeChild(this.list.lastChild);
    }
  }

  renderList() {
    this.$('button').disabled = true;

    FilmList.filmService.getFilms(this.currentPage, this.records).then((response) => {
      response.map((filmData) => {
        this.addFilm(filmData);
      });

      if (response.length < 1) {
        this.$('button').style.display = 'none';
      } else {
        this.$('button').disabled = false;
      }
    });
  }
}
