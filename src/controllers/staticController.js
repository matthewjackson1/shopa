module.exports = {
    index(req, res, next){
        res.render("static/index", {title: "Welcome to Bloccit"});
    },

    test(req, res) {
        res.send([{text: "Foo"}]);
    }
  }