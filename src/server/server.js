const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const todos = [
  { id: 1, text: 'Hello, world!', status: 'active', archive: false },
  { id: 2, text: 'Pick up groceries', status: 'complete', archive: false }
];

app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;
  res.render('index', { bundle });
});

app.get('/todos', (req, res) => {
  res.json(JSON.stringify(todos));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });

  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', (req, res) => {
  console.log('OBJECT STATE BEFORE', todos);
  const text = req.body.data.text;

  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

  const id = todos.length + 1;
  const newTodo = { id, text, status: 'active', archive: false };

  todos.push(newTodo);


  console.log('OBJECT STATE AFTER', todos);
  res.status(201).json(todos);
});




app.delete('/todos/:id', (req, res) => {
  // res.status(500).send({ message: 'not implemented' });

  let id = parseInt(req.params.id);
  let idx = todos.findIndex(todo => todo.id === id);

  // Error Catch
  if(id === -1) {
    console.log('Something went very wrong...');
  }

  res.json(todos[idx])
  todos.splice(idx,1)

  
});

app.put('/todos/:id', (req, res) => {
  // res.status(500).send({"message": "not implemented"});
 
  let id = req.params.id;
  let idx = todos.findIndex(todo => todo.id === id);

  /* INSTANT UPDATE */
  todos[idx] = req.body.data;

  /* MUTATES OUR "STORE" */
  todos.splice(idx, 1, req.body.data);

  res.json(todos[idx]);
});

// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
