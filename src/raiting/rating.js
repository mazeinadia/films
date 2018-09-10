import Component from '../component';
import ratingTemplate from './rating.html';
import ratingStyle from './rating.pcss';

export default class Rating extends Component {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    Component.addTemplateToDocument('rating-template', ratingTemplate, ratingStyle);
    this.appendTemplateContentToRoot('rating-template');
  }
}
