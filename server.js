var Express = require('express');
var path = require('path');

Express()
  .set('view engine', 'ejs')
  .use('/public', Express.static(path.resolve('public')))
  .get('/films', (req, res) => res.render('index', { view: 'films' }))
    .get('/films/add', (req, res) => res.render('index', { id: 'null', view: 'add' }))
    .get('/films/change/:id', (req, res) => {
        const id = req.params.id;
        return res.render('index', { id: id, view: 'add' });
    })
  .get('/films/:id', (req, res) => {
    const id = req.params.id;
    return res.render('index', { id: id, view: 'film' });
  })
  .get('*', (req, res) => res.render('index', { view: 'films' }))
  .listen(process.env.PORT || 4000, () => {
    console.log('Application listening on port ' + (process.env.PORT || '4000'));
  })