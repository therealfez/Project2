module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    source: DataTypes.TEXT,
    tag: DataTypes.STRING
  });
  return Example;
};
