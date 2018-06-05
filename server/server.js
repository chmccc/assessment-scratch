const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./user/userController');
// const controller = require('./controller');

const fakeDB = [{id: 0, text: "First to-do"}, {id: 1, text: "Second to-do"}, {id: 2, text: "Third to-do"}];

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/signup.html')));

app.post('/signup', userController.createUser);

app.get('/todos', (req, res) => res.json(fakeDB));

app.post('/todos', (req, res) => {
  console.log('adding...', req.body.text)
  fakeDB.push({id: fakeDB.length, text: req.body.text}); 
  res.send(201);
});

app.delete('/todos/:id', (req, res) => {
  console.log('deleting...', req.params.id);
  // fakeDB.splice(req.params.id, 1);
  for (let i = 0; i < fakeDB.length; i++) {
    if (fakeDB[i].id == req.params.id) {
      fakeDB.splice(i, 1);
      break;
    }
  }
  res.send(201);
});

app.listen(8004, () => console.log('listening on port 8004...'));