// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [
  {id: 1, name: 'Đi chợ'},
  {id: 2, name: 'Nấu cơm'},
  {id: 3, name: 'Rửa bát'},
  {id: 4, name: 'Học code tại CodersX'}
];

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
 res.render('index'); 
});

app.get('/todos', (req, res) => {
  res.render('todos/index', {
    todos: todos
  });
});

app.get('/todos/search', (req, res) => {
  var q = req.query.q;
  var matchedTodo = todos.filter((todo) => {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render('todos/index', {
    todos: matchedTodo
  });
});

app.get('/todos/create', (req, res) => {
  res.render('todos/create');
});

app.post('/todos/create', (req, res) => {
	todos.push(req.body);
	res.redirect('/todos');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
