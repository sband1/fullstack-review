const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  repo_name: String,
  repo_url: String,
  created_at: String,
  updated_at: String,
  forks_count: Number,
  description: String,
  username: String,
  owner_id: Number,
  owner_url: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (queryArr, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  Repo.insertMany(queryArr, {ordered: false}, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, err);
    }
  })

}

module.exports.save = save;