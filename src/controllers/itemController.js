const itemQueries = require("../db/queries.items.js");
const Authorizer = require("../policies/item.js");

module.exports = {
  index(req, res, next){
    itemQueries.getAllItems(req, (err, items) => {
              if(err){
              console.log(err);
                res.redirect(500, "static/index");
              } else {
                res.render("items/index", {items});
              }
            });
  },

  getUserItems(req, res, next){

    itemQueries.getAllItems(req, (err, items) => {
        if(err){
          console.log(err);
          } else {
            res.send(items);
          }
        });
  },
  
  create(req, res, next){
 // #2
    console.log("CREATE");
    const authorized = new Authorizer(req.user).create();

    if(authorized) {
      console.log(authorized);
 // #3
      let newItem = {
        name: req.body.name,
        userId: req.user.id
      };

      console.log("Newitem", newItem);

 // #4
      itemQueries.createItem(newItem, (err, item) => {
 // #5
        if(err){
          req.flash("error", err);
          console.log(err);
        }
        console.log("HEREEE");
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