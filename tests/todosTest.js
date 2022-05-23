var request = require("request"),
  expect = require("chai").expect,
  baseUrl = "http://localhost:3000";

describe("Todos", function () {
  it("should list ALL todos on GET /api/todos", function (done) {
    request(baseUrl + "/api/todos", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should add a NEW todo on POST /api/todos", function (done) {
    request.post(
      {
        url: baseUrl + "/api/todos",
        form: {
          id: 0001,
          description: "Take my wife for a walk",
          faite: true,
        },
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("should list a SINGLE todo on GET /api/todos/:id", function (done) {
    request(baseUrl + "/api/todos", function (error, response, body) {
      var allTodos = JSON.parse(body).todos;
      var singleTodo = allTodos[allTodos.length - 1];
      request(
        baseUrl + "/api/todos/" + singleTodo._id,
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });

  it("should update a SINGLE todo on PUT /api/todos/:id", function (done) {
    request(baseUrl + "/api/todos", function (error, response, body) {
      var allTodos = JSON.parse(body).todos;
      var singleTodo = allTodos[allTodos.length - 1];
      request.put(
        {
          url: baseUrl + "/api/todos/" + singleTodo._id,
          form: {
            id: 0001,
            description: "Take Node js for a walk",
            faite: true,
          },
        },
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });

  it("should delete a SINGLE todo on DELETE /todos/:id", function (done) {
    request(baseUrl + "/api/todos", function (error, response, body) {
      var allTodos = JSON.parse(body).todos;
      var singleTodo = allTodos[allTodos.length - 1];
      request.del(
        baseUrl + "/api/todos/" + singleTodo._id,
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
});
