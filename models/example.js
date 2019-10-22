module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    source: DataTypes.text,
    tag: DataTypes.text
  });
  return Example;
};
