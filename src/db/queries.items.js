const Item = require("./models").Item;
const User = require("./models").User;

const Authorizer = require("../policies/item.js");

module.exports = {
  getAllItems(req, callback) {
    return Item.findAll({
      where: {
        userId: req.user.id,
      }
    })
      .then((items) => {
        callback(null, items);
      })
      .catch((err) => {
        callback(err);
      })
  },

  createItem(newItem, callback) {
    return Item.create(newItem)
      .then((item) => {
        callback(null, item);
      })
      .catch((err) => {
        callback(err);
      });
  },

  // #3
  deleteItem(req, callback) {
    console.log("REQ", req.user);
    return Item.findAll({
      where: {
        userId: req.user.id,
        name: req.body.name
      }
    })
      .then((item) => {
        console.log(item);
        const authorized = new Authorizer(req.user, item[0]).destroy();

        if (authorized) {
          console.log("authorized to destroy");
          item[0].destroy();
          callback(null, item[0]);
        } else {
          req.flash("notice", "You are not authorized to do that.")
          callback(401)
        }
      })
  },

  updateItem(req, callback) {

    // #1
    return Item.findAll({
      where: {
        userId: req.user.id,
        name: req.body.currentName
      }
    })
      .then((item) => {
        console.log(item);
        // #2
        if (!item) {
          return callback("Item not found");
        }

        // #3
        const authorized = new Authorizer(req.user, item[0]).update();

        if (authorized) {
          console.log("GOT HERE");
          // #4    console
          item[0].update({ name: req.body.newName })

            .then(() => {
              console.log("should be updated", item[0]);
              callback(null, item[0]);
            })
            .catch((err) => {
              callback(err);
            });
        } else {

          // #5
          req.flash("notice", "You are not authorized to do that.");
          callback("Forbidden");
        }
      });
  },

  toggleItem(req, callback) {

    // #1
    return Item.findAll({
      where: {
        userId: req.user.id,
        name: req.body.name
      }
    })
      .then((item) => {
        console.log(item);
        // #2
        if (!item) {
          return callback("Item not found");
        }

        // #3
        const authorized = new Authorizer(req.user, item[0]).update();

        if (authorized) {
          console.log("GOT HERE");
          // #4    console
          item[0].update({ is_complete: req.body.newCompletionState })

            .then(() => {
              console.log("should be updated", item[0]);
              callback(null, item[0]);
            })
            .catch((err) => {
              callback(err);
            });
        } else {

          // #5
          req.flash("notice", "You are not authorized to do that.");
          callback("Forbidden");
        }
      });
  }

}