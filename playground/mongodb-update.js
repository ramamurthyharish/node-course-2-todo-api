const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if (err) {
    return console.log('Failed to connect to MongoDb server');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Todo').findOneAndUpdate({
  //   _id : new ObjectID('5b1627ed7055254a1cd6bbd4')
  // } , {
  //   $set :{
  //     ranking : 10
  //   }
  // } , {
  //   returnOriginal : false
  // }).then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndUpdate({
    _id : new ObjectID('5b162dc96f25cb23b0c5dcd9')
  } , {
    $set :{
      name : "Harish"
    } ,
    $inc : {
      age : 2
    }

  } , {
    returnOriginal : false
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
