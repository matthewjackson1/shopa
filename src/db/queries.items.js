const Item = require("./models").Item;
const User = require("./models").User;

const Authorizer = require("../policies/item.js");

module.exports = {

 // #2
  createItem(newItem, callback){
    return Item.create(newItem)
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    });
  },

 // #3
  deleteItem(req, callback){
    return Item.findById(req.params.id)
    .then((item) => {
      const authorized = new Authorizer(req.user, item).destroy();

      if(authorized){
        item.destroy();
        callback(null, item)
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401)
      }
    })
  }

}