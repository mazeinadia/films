export default class Component extends HTMLElement {
  constructor() {
    super();
    this.boundPropertiesToElements = {};
    this.eventListeners = [];
  }

  static convertCamelCaseToKebab(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  _addEventListener(query, eventType, callback, isShadowRoot) {
    const root = isShadowRoot ? this.shadowRoot : this;

    const handler = (event) => {
      const target = event.target;
      const element = target.closest(query);

      if (!element) return;

      if (!root.contains(element)) return;

      callback = callback.bind(this);

      callback(event, element);
    };

    const eventListener = {
      type: eventType,
      handler,
      isShadowRoot,
    };

    this.eventListeners.push(eventListener);

    root.addEventListener(eventListener.type, eventListener.handler);
  }

  addShadowEventListener(query, eventType, callback) {
    this._addEventListener(query, eventType, callback, true);
  }

  static addTemplateToDocument(id, content, style) {
    const template = document.createElement('template');
    template.id = id;
    template.innerHTML = (style ? `<style>${style}</style>` : '') + content;
    document.getElementById('templates').appendChild(template);
  }

  appendTemplateContentToRoot(templateId) {
    const template = document.getElementById(templateId);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  bindPropertiesToElements(names) {
    names.map(name => {
      const selector = `[data-bind-${Component.convertCamelCaseToKebab(name)}]`;

      return Object.defineProperty(this, name, {
        get: () => this.boundPropertiesToElements[name],
        set: value => {
          this.boundPropertiesToElements[name] = value;
          const elements = Array.from(this.shadowRoot.querySelectorAll(selector));
          elements.map(element => element.innerText = value);
        },
      });
    });
  }

  bindPropertiesToAttributes(names) {
    names.map(name => {
      const attributeName = Component.convertCamelCaseToKebab(name);

      return Object.defineProperty(this, name, {
        get: () => {
          const value = this.getAttribute(attributeName);
          return value === String(Number(value)) ? +value : value;
        },
        set: value => (value ? this.setAttribute(attributeName, value) : this.removeAttribute(attributeName)),
      });
    });
  }
}
