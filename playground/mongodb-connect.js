const MongoClient = require('mongodb').MongoClient;

var captain = {name : 'MSD' , age : 37} ;
var {name} = captain;
console.log('Name : ' , name);
MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if (err) {
    return console.log('Failed to connect to MongoDb server');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Todo').insertOne({
  //   captain : 'MSD' ,
  //   ranking : 1
  // } , (err , result) => {
  //   if (err ) {
  //     return console.log('Error : ' , err);
  //   }
  //   console.log(JSON.stringify(result.ops , undefined , 2));
  // });



  // db.collection('Users').insertOne({
  //   name : 'HR' ,
  //   age : 25 ,
  //   location : 'Bangalore'
  // } , (err , result) => {
  //   if (err ) {
  //     return console.log('Error : ' , err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  db.close();
});
