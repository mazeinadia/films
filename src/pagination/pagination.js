import * as ultimatePagination from 'ultimate-pagination';
import Component from '../component';

const dependencies = {};

export default class Pagination extends Component {
  static get templateService() {
    return dependencies.templateService;
  }

  static set templateService(dependency) {
    dependencies.templateService = dependency;
  }

  get totalPages() {
    return Math.ceil(this.totalRecords / this.recordsPerPage);
  }

  get items() {
    return this.shadowRoot.getElementById('items');
  }

  get input() {
    return this.shadowRoot.getElementById('page-input');
  }

  static get observedAttributes() {
    return ['current-page'];
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    Pagination.templateService.appendTemplateContentToRoot('pagination-template', root);
    this.bindPropertiesToAttributes([
      'currentPage',
      'recordsPerPage',
      'totalRecords',
    ]);
    console.log(this.totalRecords);
    this.addShadowEventListener('.page', 'click', this.clickPage);
    this.addShadowEventListener('#page-input', 'change', this.changePageInput);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'current-page') {
      this.input.value = newValue;
      this.renderItems();
    }
  }

  dispatchChange(page) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { page } }));
  }

  clickPage(event, element) {
    const page = +element.getAttribute('data-value');
    this.dispatchChange(page);
  }

  changePageInput(event, input) {
    const page = parseInt(input.value);

    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.dispatchChange(page);
  }

  emptyItems() {
    while (this.items.hasChildNodes()) {
      this.items.removeChild(this.items.lastChild);
    }
  }

  renderItems() {
    this.emptyItems();

    if (this.currentPage > this.totalPages || this.totalPages === 1) {
      return;
    }

    const model = ultimatePagination.getPaginationModel({
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      hideFirstAndLastPageLinks: true,
    });

    const addElement = (item, text, classNames) => {
      const element = document.createElement('span');

      element.innerText = text;

      if (Array.isArray(classNames)) {
        classNames.map(className => element.classList.add(className));
      } else {
        element.classList.add(classNames);
      }

      if (item.isActive) {
        element.classList.add('active');
      }

      element.setAttribute('data-value', item.value);

      this.items.appendChild(element);
    };

    const addNumber = item => addElement(item, item.value.toString(), ['page', 'number']);
    const addEllipsis = item => addElement(item, '...', 'ellipsis');
    const addPrev = item => addElement(item, '<', ['prev', 'page']);
    const addNext = item => addElement(item, '>', ['next', 'page']);

    model.map((item) => {
      switch (item.type) {
        case ultimatePagination.ITEM_TYPES.PAGE:
          addNumber(item);
          break;
        case ultimatePagination.ITEM_TYPES.ELLIPSIS:
          addEllipsis(item);
          break;
        case ultimatePagination.ITEM_TYPES.PREVIOUS_PAGE_LINK:
          addPrev(item);
          break;
        case ultimatePagination.ITEM_TYPES.NEXT_PAGE_LINK:
          addNext(item);
          break;
        default:
          break;
      }
    });
  }
}
