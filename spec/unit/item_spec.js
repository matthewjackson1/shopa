// #1: We import our dependencies
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Item = require("../../src/db/models").Item;

describe("Item", () => {

  // #2: Before each test, we scope a user and item to the test context.
  beforeEach((done) => {
    this.user;
    this.topic;
    this.post;
    this.item;

    sequelize.sync({ force: true }).then((res) => {

      // #3: We create test data we can use during test execution
      User.create({
        username: "starman",
        password: "Trekkie4lyfe"
      })
        .then((user) => {
          this.user = user;
          Item.create({
            name: "Milk",
            userId: this.user.id,
            is_complete: false
          }).then((item) => {
            this.item = item;
            done();
          })
            .catch((err) => {
              console.log(err);
              done();
            })
        }).catch((err) => {
          console.log(err);
          done();
        });
    });
  });

  // #4: We start a test suite for the `create` action
  describe("#create()", () => {

    it("should create an item object with a name, assigned user and completed state", (done) => {
      Item.create({                // create a item
        name: "Milk",
        userId: this.user.id,
        is_complete: false
      })
        .then((item) => {            // confirm it was created with the values passed
          expect(item.name).toBe("Milk");
          expect(item.userId).toBe(this.user.id);
          expect(item.is_complete).toBe(false);
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });


    // #5: We test that items with invalid attributes are not created
    it("should not create a item with missing name or assigned user", (done) => {
      Item.create({
        name: "Bananas"
      })
        .then((item) => {

          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();

        })
        .catch((err) => {

          expect(err.message).toContain("Item.userId cannot be null");
          done();

        })
    });

  });


  // #7: We test the `getUser` method which should return the User associated with the item called on
  describe("#getUser()", () => {

    it("should return the associated user", (done) => {

      this.item.getUser()
        .then((associatedUser) => {
          expect(associatedUser.username).toBe("starman");
          done();
        });

    });

  });



});