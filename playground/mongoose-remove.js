const {ObjectId} = require('mongoDb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/users');

Todo.remove({}).then((result) => {
  console.log(result);
});


Todo.findByIdAndRemove('5b1e400b4e8a245ec3c5570f').then((todo) => {
  console.log(todo);
});
