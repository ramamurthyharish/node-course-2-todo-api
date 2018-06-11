const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongoDb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');



const todos = [{
  _id : new ObjectId(),
  text : 'First test todo'
} , {
  _id : new ObjectId(),
  text : 'Second test todo',
  completed : true,
  completedAt : 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});

describe('POST /todos' , () => {
  it('Should create new todo' , (done) => {
    var text = 'Test todo text' ;
    request(app)
    .post('/todos')
    .send({text : text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err , res) => {
      if (err) {
        return done(err) ;

      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(3);
        expect(todos[2].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      })
    })
  });



  it('Should not create todo with empty text' , (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err , res) => {
      if (err) {
        return done(err) ;

      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => {
        done(e);
      })
    })
  });
});



describe('GET /todos' , () => {
  it('Should display all todos' , (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done)
  });
});


describe('GET /todos/:id' , () => {
  it('Should return the doc' , (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });


  it('Should return 404 if todo is not found' , (done) => {
    var hexId = new ObjectId().toHexString() ;
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });


  it('Should return 404 for nor-ObjectIds ' , (done) => {
    request(app)
    .get('/todos/123bc')
    .expect(404)
    .end(done);
  }) ;


});



describe('DELETE /todos/:id' , () => {
  it('Should remove a todo' , (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err , res) => {
      if (err) {
        return done(err);
      }


    Todo.findById(hexId).then((todo) => {
      console.log(todo)
      expect(todo).toNotExist();
      done();
    }).catch((e) => {
      done(e);
    });
  }) ;
});
  it('Should return 404 if todo does not exist' , (done) => {
    var hexId = new ObjectId().toHexString() ;
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });
  it('Should return 404 if OdjectId is not valid' , (done) => {
    request(app)
    .delete('/todos/123bc')
    .expect(404)
    .end(done);
  });

});


describe('PATCH /todos/:id' , () => {
    it('Should update the todo' , (done) => {
        var text = 'Updated todo1';
        var hexId = todos[0]._id.toHexString();
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
          text ,
          completed : true
        })
        .expect(200)
        .expect((res) => {
          console.log(res.body);
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });

    it('Should clear completedAt when todo is not completed' , (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'Updated todo2' ;
        request(app)
        .patch(`/todos/${hexId}`)
        .send({text : text , completed : false})
        .expect(200)
        .expect((res) => {
          console.log(res.body);
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        }).end(done);
    });
});
