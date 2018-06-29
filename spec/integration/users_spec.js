const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({ force: true })
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

  });

  describe("GET /users/sign_up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up");
        done();
      });
    });

  });


  describe("POST /users", () => {

    // #1
    it("should create a new user with valid values and redirect", (done) => {

      const options = {
        url: base,
        form: {
          username: "usertest",
          password: "123456789",
          passwordConfirmation: "123456789"
        }
      }

      request.post(options,
        (err, res, body) => {

          // #2
          User.findOne({ where: { username: "usertest" } })
            .then((user) => {
              expect(user).not.toBeNull();
              expect(user.username).toBe("usertest");
              expect(user.id).toBe(1);
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        }
      );
    });


  });

  describe("GET /users/sign_in", () => {

    it("should render a view with a sign in form", (done) => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign in");
        done();
      });
    });

  });

});