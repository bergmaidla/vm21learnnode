const express = require('express');
const path = require ('path')
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
autoescape:true,
express:app
});

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  console.log(req.query.name);
  res.render('index.njk');
    
});
 

app.get('/page', (req, res) => {
  res.render('page.njk', {page: req.query.p});
    
});



app.get('/', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.render('greeting.njk',{
    name: req.query.name,
    age: req.query.age
  });
  });

app.get('/about', (req, res) => {
  res.render('about.njk');
});

app.get('/contact', (req, res) => {
  res.render('contact.njk');
});

app.get('/gallery', (req, res) => {
  res.render('gallery.njk');
});

app.get('/values', (req, res) => {
  res.render('values.njk');
});

app.get('/arbuus', (req, res) => {
  res.render('arbuus.njk');
});



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost: ${port}`);
});
