const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";

const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {

  beforeEach((done) => {

// #2
    this.user;
    this.topic;
    this.post;
    this.item;

    sequelize.sync({force: true}).then((res) => {

// #3
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;  // store user

        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{   
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id   
          }]
        }, {
          include: {                        //nested creation of posts
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic;                 // store topic
          this.post = this.topic.posts[0];  // store post

          Item.create({  
            body: "ay caramba!!!!!",
            userId: this.user.id,          
            postId: this.post.id
          })
          .then((item) => {
            this.item = item;             // store item
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
  });

  //test suites will go there

});