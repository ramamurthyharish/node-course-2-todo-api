var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');


let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://harishr:Leelu1958@ds147304.mlab.com:47304/todoapi'
};
mongoose.connect( db.localhost || db.mlab);


module.exports = {
  mongoose
};
