const express = require('express');
const path = require ('path')
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const sqlite3 = require("sqlite3");
const open = require('sqlite').open;

open({
  filename:'./database.sqlite',
  driver: sqlite3.Database
}).then(async db =>{
  const result = await db.all('select * from articles;');
  console.log(result);


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

app.get('/articles',async (req, res) => {
  const articles = await db.all('select * from articles;');
  console.log(articles);
  res.render('articles.njk', {articles});
});

app.get('/articles/new', (req, res) => {
  res.render('newarticle.njk');
});

app.post('/articles', async (req, res) => {
  await db.run(`insert into articles (title,body) values('${req.body.title}','${req.body.body}');`);
  res.redirect ('/articles');
});

app.get('/articles/edit', async (req, res) => {
  const article = await db.get(`select * from articles where id=${req.query.id};`);
  res.render('editarticle.njk', {article});
});

app.post('/articles/edit', async (req, res) => {
  await db.run(`UPTADE articles
   set title'${req.body.title}', body='${req.body.body}'
    where id=${req.query.id}`);
  res.redirect ('/articles');
});

app.get('/articles/delete', async (req, res) => {
  await db.run(`DELETE FROM  articles
    where id=${req.query.id}`);
  res.redirect ('/articles');
});



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost: ${port}`);
});
});