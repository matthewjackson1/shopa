// #1
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Item = require("./models").Item;

module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      username: newUser.username,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback){

    return User.findById(id, {
      include: [
        {model: Item, as: "items" }
      ]
    }).then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  }
  

}