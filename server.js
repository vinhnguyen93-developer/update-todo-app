// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var low = require('lowdb')
var shortid = require('shortid');

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
 
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [] })
  .write()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
 res.render('index'); 
});

app.get('/todos', (req, res) => {
  res.render('todos/index', {
    todos: db.get('todos').value()
  });
});

app.get('/todos/search', (req, res) => {
  var q = req.query.q;
  var matchedTodo = db.get('todos').value().filter((todo) => {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render('todos/index', {
    todos: matchedTodo
  });
});

app.get('/todos/create', (req, res) => {
  res.render('todos/create');
});

app.get('/todos/:id/delete', (req, res) => {
  var id = req.params.id;
  
  var todo = db.get('todos').remove({ id: id }).write();
  
  // res.render('todos/delete', {
  //   todo: todo
  // });
  res.redirect('/todos');
});

app.post('/todos/create', (req, res) => {
  req.body.id = shortid.generate();
	db.get('todos').push(req.body).write();
	res.redirect('/todos');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
