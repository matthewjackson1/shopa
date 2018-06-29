const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/items/";

const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {

  beforeEach((done) => {

// #2
    this.user;
    this.item;

    sequelize.sync({force: true}).then((res) => {

// #3
      User.create({
        username: "starman",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

        Item.create({
          name: "Banana",
          userId: this.user.id,
          is_complete: false
        })
          .then((item) => {
            this.item = item;             
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
 

  //test suites will go there
  /*
    describe("GET /getitems", () => {});
    describe("GET /items", () => {});
    describe("POST /items/create", () => {});
    describe("POST /items/delete", () => {});
    describe("POST /items/update", () => {});
    describe("POST /items/toggleComplete", () => {});
  */
});