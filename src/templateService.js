export default class TemplateService {
  constructor(templatesRootId) {
    this.rootId = templatesRootId;
  }

  addTemplateToDocument(id, content, style) {
    const template = document.createElement('template');
    template.id = id;
    template.innerHTML = (style ? `<style>${style}</style>` : '') + content;
    document.getElementById(this.rootId).appendChild(template);
  }

  appendTemplateContentToRoot(templateId, root) {
    const template = document.getElementById(templateId);
    root.appendChild(template.content.cloneNode(true));
  }
}
