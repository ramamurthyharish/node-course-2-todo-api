require('./config/config.js');


const {ObjectId} = require('mongoDb');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/users.js');
var _ = require('lodash');


const port = process.env.PORT || 3000 ;

var app = express();


app.use(bodyParser.json());

app.post('/todos' , (req , res) => {
  console.log(req.body);
  var todo = new Todo({
    text : req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  } , (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos' , (req , res) => {
    Todo.find({}).then((todos) => {
      res.send({todos});
    } , (e) => {
      res.status(400).send(e);
    });
});


app.get('/todos/:id' , (req , res) => {
  var id = req.params.id ;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch( (e) => {
    res.status(400).send();
  });

});



app.delete('/todos/:id' , (req , res) => {
  var id = req.params.id ;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch( (e) => {
    res.status(400).send();
  });
});



app.patch('/todos/:id' , (req , res) => {
  var id = req.params.id ;
  var body = _.pick(req.body, ['text' , 'completed']);
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false
    body.cpmpletedAt = null
  }

  Todo.findOneAndUpdate(id , {$set: body} , {new : true}).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });


})






app.listen(port , () => {
  console.log(`App is listening on port: port`);
});

module.exports = {
  app
};
