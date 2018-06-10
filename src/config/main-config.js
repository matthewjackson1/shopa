module.exports = {
  init(app, express){

    require("dotenv").config();
    const path = require("path");
    const viewsFolder = path.join(__dirname, "..", "views");
    const passportConfig = require("./passport-config");
    const session = require("express-session");
    const flash = require("express-flash");
    const expressValidator = require("express-validator");
    const bodyParser = require("body-parser");

    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    app.use(flash());
    app.use(expressValidator());
    passportConfig.init(app);
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use((req,res,next) => {
      res.locals.currentUser = req.user;
      next();
    })

  }

};