import Component from '../component';

const dependencies = {};

export default class Film extends Component {
  static get templateService() {
    return dependencies.templateService;
  }

  static set templateService(dependency) {
    dependencies.templateService = dependency;
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    Film.templateService.appendTemplateContentToRoot('film-template', root);
    this.addShadowEventListener('i', 'click', this.del);
    this.addShadowEventListener('data-bind-title', 'click', this.select);

    this.bindPropertiesToElements([
      'id',
      'title',
      'rating']);
  }

  del() {
    this.dispatchEvent(new Event('deleteFilm', {bubbles: true, composed: true}));
  }

  select() {
      this.dispatchEvent(new Event('selectFilm', {bubbles: true, composed: true}));
  }
}
