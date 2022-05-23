var request = require("request"),
  expect = require("chai").expect,
  baseUrl = "http://localhost:3000";

describe("users", function () {
  it("should register", function () {
    request.post(
      {
        url: baseUrl + "/api/register",
        form: {
          username: "mohmed",
          email: "mfakchich@outlook.com",
          password: "testttttttt",
        },
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it.each([
    { email: "helloWorld", password: "1234" },
    { email: "AQS", password: "" },
    { email: "blopi@dz" },
    { email: "dzadzad", passworde: "456" },
  ])("Should refuse without inserting it", async (objectTest) => {
    const idDebut = Accounts.id;
    const result = await request(app)
      .post("/register")
      .send(objectTest)
      .expect(400);
    const idFin = Accounts.id;
    // Expect => Sorte de if pour vérifier
    expect(idFin).toBe(idDebut);
  });

  it.each([
    { email: "example@example.com", password: "1234" },
    { email: "example1@example.com", password: "1234" },
    { email: "example2@example.com", password: "1234" },
    { email: "example3@example.com", password: "1234" },
  ])("Should Cannot connect", async (objectTest) => {
    const register = await request(app)
      .post("/register")
      .send(objectTest)
      .expect(201);
    objectTest.password = "";
    const login = await request(app)
      .post("/login")
      .send(objectTest)
      .expect(400);
  });
});
