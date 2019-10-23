var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    }
  });

  User.beforeSave(function(user) {
    if (!user.changed("password")) {
      return;
    }
    console.log(user.dataValues);
    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync(user.dataValues.password, salt);
    user.dataValues.password = hash;
  });

  User.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
