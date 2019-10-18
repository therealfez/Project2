var db = require("../models");
var sources = require("../data/sources");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // Object.keys(sources).forEach(function(key) {
    //   var key = sources[key];
    //   console.log(key);
    // });
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
