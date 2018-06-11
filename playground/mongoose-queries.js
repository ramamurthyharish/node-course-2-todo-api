const {ObjectId} = require('mongoDb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/users');

// var id = '5b1e1a607e4129540e5c50e311' ;
// if (!ObjectId.isValid(id)) {
//   console.log('ID is not valid');
// }
//
// Todo.find({
//   _id : id
// }).then((todos) => {
//   console.log('Todos:' , todos);
// });
//
// Todo.findOne({
//   _id : id
// }).then((todo) => {
//   console.log('Todo:' , todo);
// });
//
// Todo.findById(id).then((todoById) => {
//   if (!todoById) {
//     return console.log('ID not found');
//   }
//   console.log('Todo BY ID:' , todoById);
// }).catch((e) => {
//   console.log(e);
// }) ;
var id = '5b1763d2d7d822a40fee5e1f' ;

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log(JSON.stringify(user , undefined , 2));
} , (e) => {
  console.log(e);
});
