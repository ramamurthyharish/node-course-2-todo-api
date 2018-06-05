const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if (err) {
    return console.log('Failed to connect to MongoDb server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Users').findOneAndDelete({
    _id : new ObjectID('5b16535058949c1b3dd978c6')
  }).then((result) => {
    console.log(result);
  });
  db.close();
});
