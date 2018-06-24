module.exports = {
 
    validateUsers(req, res, next) {
      if(req.method === "POST") {

 // #1 
        req.checkBody("username", "must be valid").isLength({min:1});
        req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
        req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
      }
 
      const errors = req.validationErrors();
 
      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next();
      }
    },

    validateItems(req, res, next) {
      if(req.method === "POST") {
        req.checkBody("name", "must not be empty"). notEmpty();
      }
 
      const errors = req.validationErrors();
 
      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next()
      }
    }
 }