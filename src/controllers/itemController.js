const itemQueries = require("../db/queries.items.js");
const Authorizer = require("../policies/item.js");

module.exports = {
  create(req, res, next){
 // #2
    const authorized = new Authorizer(req.user).create();

    if(authorized) {

 // #3
      let newItem = {
        name: req.body.body,
        userId: req.user.id
      };

 // #4
      itemQueries.createItem(newItem, (err, item) => {
 // #5
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      req.redirect("/users/sign_in");
    }
  },

// #6
  destroy(req, res, next){
    itemQueries.deleteItem(req, (err, item) => {
      if(err){
        res.redirect(err, req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }
}