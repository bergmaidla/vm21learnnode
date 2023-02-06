const express = require('express');
const path = require ('path')
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
autoescape:true,
express:app
});

app.get('/', (req, res) => {
  console.log(req.query.name);
  res.render('index.njk');
    
});
 
app.get('/', (req, res) => {
  console.log(req.query.name);
  res.render('greeting.njk');
 
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
