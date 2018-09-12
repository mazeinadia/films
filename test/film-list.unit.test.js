require('babel-polyfill');

const chai = require('chai');
const mocha = require('mocha');


//require('./lib/webcomponents-bundle.js');
// require('./lib/polyfill-service');
// require('./lib/custom-elements-polyfill');
// require('./lib/template-polyfill');

const createElements = require('../public/index');

const assert = chai.assert;
mocha.setup('bdd');

// активация полифила template до загрузки DOM
try {
    HTMLTemplateElement.bootstrap(document);
} catch (e) {}

createElements();

describe('Список фильмов', () => {
  it('При загрузке данных отображает заголовок', () => {
    assert.equal(document.querySelectorAll('.title')[0].innerText, 'Film List');
  });

  it('При загрузке данных кнопка MORE недоступна', () => {
    assert.equal(typeof (document.querySelector('fl-film-list')), 'HTMLElement');
  });
});
