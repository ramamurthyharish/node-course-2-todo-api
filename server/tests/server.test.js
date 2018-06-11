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
  text : 'Second test todo'
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
