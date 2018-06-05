const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if (err) {
    return console.log('Failed to connect to MongoDb server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Users').find({
    _id : new ObjectID('5b1627ed7055254a1cd6bbd5')
  }).count().then((count) => {
    console.log(count);
  } , (err) => {
    console.log(err);
  });
  db.close();
});
