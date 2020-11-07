const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js')
let app = express();

const db = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  console.log('Server post', req.body);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.username, (err, result) => {
    if (err) {
      console.log('github dan1 get error', err.data);
      res.status(404);
    } else {
      console.log('github dan1 get success');
      var query = result.data.map((repo) => {
        return {
          id: repo.id,
          repo_name: repo.full_name,
          repo_url: repo.html_url,
          created_at: repo.created_at,
          updated_at: repo.created_at,
          forks_count: repo.forks_count,
          description: repo.description,
          username: repo.owner.login,
          owner_id: repo.owner.id,
          owner_url: repo.owner.url,
        };
      });
      console.log('query', query);
      db.save(query, (err, result) => {
        if (err) {
          console.log('mongoose insert error', err);
          res.sendStatus(404);
        } else {
          console.log('mongoose insert successs');
          res.status(201).json(result);
        }
      })
    }
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.Repo.find().sort({forks_count: 'desc'}).limit(25).exec((err, data) => {
    if (err) {
      console.log(err);
      res.status(404).json(err);
    } else {
      console.log('find success')
      res.status(200).json(data);
    }
  })


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

